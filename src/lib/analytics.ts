/**
 * Analytics utility functions
 * 
 * Helper functions for tracking custom events and interactions
 */

/**
 * Track a custom event in Google Analytics via GTM
 * 
 * @param eventName - Name of the event (e.g., 'button_click', 'form_submit')
 * @param eventData - Additional event data (optional)
 * 
 * Example:
 * trackEvent('service_page_view', { service_name: 'Meta Ads Management' })
 */
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }
}

/**
 * Track page view manually (if needed)
 * 
 * @param pagePath - Path of the page
 * @param pageTitle - Title of the page
 */
export function trackPageView(pagePath: string, pageTitle?: string) {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "page_view",
      page_path: pagePath,
      page_title: pageTitle || document.title,
      page_location: window.location.href,
    });
  }
}

/**
 * Track service page view
 * 
 * @param serviceName - Name of the service
 * @param serviceSlug - Slug of the service
 */
export function trackServicePageView(serviceName: string, serviceSlug: string) {
  trackEvent("service_page_view", {
    service_name: serviceName,
    service_slug: serviceSlug,
    page_path: `/services/${serviceSlug}`,
  });
}

/**
 * Track CTA button click
 * 
 * @param buttonName - Name/identifier of the button
 * @param location - Location on page where button was clicked
 */
export function trackCTAClick(buttonName: string, location: string) {
  trackEvent("cta_click", {
    button_name: buttonName,
    button_location: location,
  });
}

/**
 * Track form submission
 * 
 * @param formName - Name/identifier of the form
 * @param formType - Type of form (e.g., 'contact', 'lead_capture')
 */
export function trackFormSubmit(formName: string, formType: string) {
  trackEvent("form_submit", {
    form_name: formName,
    form_type: formType,
  });
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}




