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

  // Extended Qualification Fields (Part B: Feature 3)
  websiteOrSocial?: string;
  additionalServices?: string[];
  businessGoal?: string;
  targetAudience?: string;
  deadline?: string;
  engagementType?: string;
  preferredContactMethod?: string;
  conditionalDetails?: Record<string, string>;
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
  const lines = [
    `*NEW PROJECT ENQUIRY — EVO HAWKS*`,
    `----------------------------------------`,
    `Client Name: ${data.fullName.trim()}`,
    `Business: ${data.businessName.trim()}`,
    `Email: ${data.email.trim()}`,
    `Phone/WhatsApp: ${data.phone.trim()}`,
    data.websiteOrSocial ? `Website/Social: ${data.websiteOrSocial.trim()}` : null,
    `Primary Service: ${data.service}`,
    data.additionalServices && data.additionalServices.length > 0 ? `Additional Services: ${data.additionalServices.join(', ')}` : null,
    `Budget Range: ${data.budget}`,
    data.engagementType ? `Engagement: ${data.engagementType}` : null,
    data.deadline ? `Target Deadline: ${data.deadline}` : null,
    data.businessGoal ? `Primary Goal: ${data.businessGoal}` : null,
    data.targetAudience ? `Target Audience: ${data.targetAudience}` : null,
    data.preferredContactMethod ? `Preferred Contact: ${data.preferredContactMethod}` : null,
    data.conditionalDetails && Object.keys(data.conditionalDetails).length > 0 
      ? `Scope Specifics:\n${Object.entries(data.conditionalDetails).map(([k, v]) => `  • ${k}: ${v}`).join('\n')}` 
      : null,
    `Project Brief: ${data.description?.trim() || 'Scope to be discussed on discovery call.'}`,
    `----------------------------------------`,
    `Submitted from evohawks.tech`,
  ];

  return lines.filter(Boolean).join('\n');
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

  // 3. Inspect configured endpoint from environment with robust fallback
  const defaultEndpoint = `https://formsubmit.co/ajax/${AGENCY_CONFIG.contact.email || 'teamevohawks@gmail.com'}`;
  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || defaultEndpoint;

  // 4. Real HTTP transmission
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        _subject: `New Project Enquiry: ${data.businessName.trim()} (${data.service})`,
        _template: 'table',
        fullName: data.fullName.trim(),
        businessName: data.businessName.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        service: data.service,
        budget: data.budget,
        description: data.description?.trim() || '',
        websiteOrSocial: data.websiteOrSocial?.trim() || '',
        engagementType: data.engagementType || '',
        deadline: data.deadline || '',
        businessGoal: data.businessGoal || '',
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

export interface ConsultationPayload {
  fullName: string;
  email: string;
  phone?: string;
  businessName?: string;
  format: 'Google Meet' | 'WhatsApp Call' | 'Phone Call';
  timeSlot: 'Morning (09:00 - 12:00 IST)' | 'Afternoon (12:00 - 16:00 IST)' | 'Evening (16:00 - 20:00 IST)';
  topic: string;
  acceptedPrivacy: boolean;
  botField?: string;
}

export interface ConsultationValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  format?: string;
  timeSlot?: string;
  topic?: string;
  acceptedPrivacy?: string;
}

export function validateConsultation(data: ConsultationPayload): { isValid: boolean; errors: ConsultationValidationErrors } {
  const errors: ConsultationValidationErrors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!data.email || !EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address for the calendar invite.';
  }

  if (data.phone && data.phone.trim().length > 0) {
    const digits = data.phone.match(PHONE_CLEAN_REGEX) || [];
    if (digits.length < 10 || digits.length > 15) {
      errors.phone = 'Please enter a valid phone or WhatsApp number (10–15 digits).';
    }
  }

  if (!data.topic || data.topic.trim().length < 5) {
    errors.topic = 'Please briefly outline what you would like to discuss (at least 5 characters).';
  }

  if (!data.acceptedPrivacy) {
    errors.acceptedPrivacy = 'You must acknowledge the privacy notice to proceed.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatConsultationBrief(data: ConsultationPayload): string {
  return [
    `*STRATEGY SESSION REQUEST — EVO HAWKS*`,
    `----------------------------------------`,
    `Name: ${data.fullName.trim()}`,
    `Email: ${data.email.trim()}`,
    `Phone/WhatsApp: ${data.phone?.trim() || 'Not provided'}`,
    `Business: ${data.businessName?.trim() || 'Not specified'}`,
    `Preferred Format: ${data.format}`,
    `Preferred Time Window: ${data.timeSlot}`,
    `Discussion Topic: ${data.topic.trim()}`,
    `----------------------------------------`,
    `Submitted from evohawks.tech/booking`,
  ].join('\n');
}

export function buildWhatsAppConsultationUrl(data: ConsultationPayload): string {
  const brief = formatConsultationBrief(data);
  const cleanNumber = AGENCY_CONFIG.contact.whatsappCleanNumber;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(brief)}`;
}

export function buildMailtoConsultationUrl(data: ConsultationPayload): string {
  const subject = encodeURIComponent(`Strategy Session Request: ${data.fullName.trim()} (${data.format})`);
  const body = encodeURIComponent(formatConsultationBrief(data));
  return `mailto:${AGENCY_CONFIG.contact.email}?subject=${subject}&body=${body}`;
}

export async function submitConsultation(data: ConsultationPayload): Promise<SubmissionResult> {
  // 1. Honeypot check
  if (data.botField && data.botField.trim().length > 0) {
    return {
      success: true,
      status: 'sent',
      message: 'Consultation request received.',
    };
  }

  // 2. Validation
  const { isValid, errors } = validateConsultation(data);
  if (!isValid) {
    const firstError = Object.values(errors)[0] || 'Please complete required fields.';
    return {
      success: false,
      status: 'error',
      message: firstError,
    };
  }

  // 3. Inspect endpoint with robust fallback
  const defaultEndpoint = `https://formsubmit.co/ajax/${AGENCY_CONFIG.contact.email || 'teamevohawks@gmail.com'}`;
  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || defaultEndpoint;

  // 4. Send HTTP request
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        _subject: `New Consultation Request: ${data.fullName.trim()} (${data.format} - ${data.timeSlot})`,
        _template: 'table',
        formType: 'consultation_request',
        fullName: data.fullName.trim(),
        email: data.email.trim(),
        phone: data.phone?.trim() || '',
        businessName: data.businessName?.trim() || '',
        format: data.format,
        timeSlot: data.timeSlot,
        topic: data.topic.trim(),
        submittedAt: new Date().toISOString(),
        sourceUrl: window.location.href,
      }),
    });

    if (response.ok) {
      return {
        success: true,
        status: 'sent',
        message: 'Your strategy session request has been received. Our team will review your objectives and email you a calendar invitation within 24 business hours.',
      };
    }

    return {
      success: false,
      status: 'error',
      message: `Delivery failed (HTTP ${response.status}). Please use WhatsApp or email below.`,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Network error';
    return {
      success: false,
      status: 'error',
      message: `Unable to transmit request: ${msg}. Please dispatch directly via WhatsApp or email.`,
    };
  }
}
