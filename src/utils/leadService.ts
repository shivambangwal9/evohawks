/**
 * Lead Delivery Service for Evo Hawks
 * 
 * Provides robust validation, anti-spam protection, and delivery integration
 * for contact and project inquiries.
 * 
 * Environment Configuration:
 * - VITE_CONTACT_FORM_ENDPOINT: The production webhook or form service URL (e.g. Formspree, Web3Forms, or custom serverless endpoint).
 * 
 * If VITE_CONTACT_FORM_ENDPOINT is not configured, the service provides an honest
 * unconfigured status and generates formatted WhatsApp and mailto links so leads
 * are never lost and the visitor is never shown a fabricated success message.
 */

import { AGENCY_CONFIG } from '../data/agencyData';

export interface EnquiryPayload {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  description?: string;
  acceptedPrivacy: boolean;
  botField?: string; // Honeypot field - must be empty
}

export interface ValidationErrors {
  fullName?: string;
  businessName?: string;
  email?: string;
  phone?: string;
  service?: string;
  budget?: string;
  acceptedPrivacy?: string;
}

export interface SubmissionResult {
  success: boolean;
  status: 'sent' | 'unconfigured' | 'error';
  message: string;
}

// RFC 5322 compliant email regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// E.164 and international phone format validation (at least 10 digits)
const PHONE_CLEAN_REGEX = /\d/g;

export function validateEnquiry(data: EnquiryPayload): { isValid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};

  // Full Name validation
  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  // Business Name validation
  if (!data.businessName || data.businessName.trim().length < 2) {
    errors.businessName = 'Please enter your business or brand name.';
  }

  // Email validation
  if (!data.email || !EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please provide a valid business email address.';
  }

  // Phone / WhatsApp validation
  const digits = (data.phone || '').match(PHONE_CLEAN_REGEX) || [];
  if (digits.length < 10 || digits.length > 15) {
    errors.phone = 'Please enter a valid phone or WhatsApp number (10–15 digits).';
  }

  // Service validation
  if (!data.service || data.service.trim().length === 0) {
    errors.service = 'Please select the primary service you require.';
  }

  // Budget validation
  if (!data.budget || data.budget.trim().length === 0) {
    errors.budget = 'Please select an estimated budget range.';
  }

  // Privacy Policy Agreement
  if (!data.acceptedPrivacy) {
    errors.acceptedPrivacy = 'You must acknowledge the privacy notice to proceed.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Builds formatted text for WhatsApp or Email dispatch.
 */
export function formatLeadBrief(data: EnquiryPayload): string {
  return [
    `*NEW PROJECT ENQUIRY — EVO HAWKS*`,
    `----------------------------------------`,
    `Client Name: ${data.fullName.trim()}`,
    `Business: ${data.businessName.trim()}`,
    `Email: ${data.email.trim()}`,
    `Phone/WhatsApp: ${data.phone.trim()}`,
    `Required Service: ${data.service}`,
    `Budget Range: ${data.budget}`,
    `Project Brief: ${data.description?.trim() || 'Scope to be discussed on discovery call.'}`,
    `----------------------------------------`,
    `Submitted from evohawks.tech`,
  ].join('\n');
}

/**
 * Builds safe, URL-encoded WhatsApp direct link.
 */
export function buildWhatsAppLeadUrl(data: EnquiryPayload): string {
  const brief = formatLeadBrief(data);
  const cleanNumber = AGENCY_CONFIG.contact.whatsappCleanNumber;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(brief)}`;
}

/**
 * Builds mailto link with prefilled subject and body.
 */
export function buildMailtoLeadUrl(data: EnquiryPayload): string {
  const subject = encodeURIComponent(`Project Enquiry: ${data.businessName.trim()} — ${data.service}`);
  const body = encodeURIComponent(formatLeadBrief(data));
  return `mailto:${AGENCY_CONFIG.contact.email}?subject=${subject}&body=${body}`;
}

/**
 * Dispatches the enquiry to the configured server-side endpoint.
 * Returns true only if the server confirms delivery with HTTP 200/201.
 */
export async function submitEnquiry(data: EnquiryPayload): Promise<SubmissionResult> {
  // 1. Honeypot check: Bots fill hidden botField
  if (data.botField && data.botField.trim().length > 0) {
    // Silently drop bot spam
    return {
      success: true,
      status: 'sent',
      message: 'Enquiry received.',
    };
  }

  // 2. Validate payload
  const { isValid, errors } = validateEnquiry(data);
  if (!isValid) {
    const firstError = Object.values(errors)[0] || 'Please check form fields.';
    return {
      success: false,
      status: 'error',
      message: firstError,
    };
  }

  // 3. Inspect configured endpoint from environment
  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

  if (!endpoint || endpoint.trim().length === 0) {
    // Honest status: endpoint is unconfigured in this environment
    return {
      success: false,
      status: 'unconfigured',
      message: 'Direct online form delivery endpoint (VITE_CONTACT_FORM_ENDPOINT) is pending configuration.',
    };
  }

  // 4. Real HTTP transmission
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        fullName: data.fullName.trim(),
        businessName: data.businessName.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        service: data.service,
        budget: data.budget,
        description: data.description?.trim() || '',
        submittedAt: new Date().toISOString(),
        sourceUrl: window.location.href,
      }),
    });

    if (response.ok) {
      return {
        success: true,
        status: 'sent',
        message: 'Your enquiry has been delivered directly to our team. We will review your brief and respond within 24 business hours.',
      };
    } else {
      let errorDetail = 'Submission failed at destination server.';
      try {
        const errorData = await response.json();
        if (errorData && errorData.error) {
          errorDetail = errorData.error;
        }
      } catch {
        // Response wasn't JSON
      }
      return {
        success: false,
        status: 'error',
        message: `Delivery failed (HTTP ${response.status}). ${errorDetail}`,
      };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Network error.';
    return {
      success: false,
      status: 'error',
      message: `Unable to transmit enquiry: ${errorMsg}. Please use WhatsApp or email as a direct fallback.`,
    };
  }
}
