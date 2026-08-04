/**
 * Analytics ligero. Sin PUBLIC_GA_MEASUREMENT_ID no hace nada.
 * Eventos sugeridos: contact_click, form_submit, plans_view, project_click, email_click, whatsapp_click
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent =
  | 'contact_click'
  | 'form_submit'
  | 'form_submit_error'
  | 'plans_view'
  | 'project_click'
  | 'email_click'
  | 'whatsapp_click';

export function track(
  event: AnalyticsEvent | string,
  props: Record<string, string | number | boolean | undefined> = {}
): void {
  if (typeof window === 'undefined') return;
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, props);
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...props });
  } catch {
    // no-op
  }
}
