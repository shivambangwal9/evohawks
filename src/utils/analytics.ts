/**
 * Privacy-Preserving Analytics & Event Tracking Utility
 * 
 * - Does NOT collect PII (Personally Identifiable Information like email, phone, passwords).
 * - Honors user's Do-Not-Track preference (navigator.doNotTrack).
 * - Dispatches events safely to window.dataLayer (GTM / GA4) if available.
 * - Safely logs in development mode for debugging.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    plausible?: (eventName: string, options?: { props?: Record<string, unknown> }) => void;
  }
}

export type AnalyticsEventName =
  | 'page_view'
  | 'service_viewed'
  | 'scope_calculated'
  | 'project_modal_opened'
  | 'case_study_opened'
  | 'booking_modal_opened'
  | 'booking_submitted'
  | 'contact_attempt'
  | 'contact_success'
  | 'contact_error'
  | 'whatsapp_click'
  | 'email_click'
  | 'start_project_step'
  | 'start_project_submitted'
  | 'package_enquiry';

export interface EventProperties {
  page?: string;
  service?: string;
  category?: string;
  project_id?: string;
  project_title?: string;
  trigger_source?: string;
  budget_bracket?: string;
  outcome?: string;
  [key: string]: unknown;
}

const isDoNotTrackEnabled = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return (
    navigator.doNotTrack === '1' ||
    (window as unknown as { doNotTrack?: string }).doNotTrack === '1'
  );
};

export const trackEvent = (
  eventName: AnalyticsEventName,
  properties: EventProperties = {}
): void => {
  if (typeof window === 'undefined') return;

  // Respect user privacy
  if (isDoNotTrackEnabled()) {
    return;
  }

  const payload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...properties,
  };

  // 1. Google Tag Manager / GA4 dataLayer
  if (Array.isArray(window.dataLayer)) {
    try {
      window.dataLayer.push(payload);
    } catch {
      // Graceful drop
    }
  }

  // 2. Plausible Analytics support
  if (typeof window.plausible === 'function') {
    try {
      window.plausible(eventName, { props: properties });
    } catch {
      // Graceful drop
    }
  }

  // 3. Local development inspection
  if (import.meta.env.DEV) {
    // Helpful debug logging in local dev
    // console.debug(`[Analytics] ${eventName}`, properties);
  }
};
