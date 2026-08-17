/**
 * Google Analytics (GA4) Utility
 * 
 * Configured via `VITE_GA_MEASUREMENT_ID` in your `.env` file (e.g. G-XXXXXXXXXX)
 */

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let isInitialized = false

/**
 * Initializes Google Analytics 4 dynamically
 */
export function initGA() {
  if (typeof window === 'undefined') return

  if (window.gtag) {
    isInitialized = true
    return
  }

  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    // Analytics ID not configured yet or placeholder
    return
  }

  if (isInitialized) return

  // Prevent multiple script injections
  if (!document.getElementById('google-analytics-script')) {
    const script = document.createElement('script')
    script.id = 'google-analytics-script'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag

    gtag('js', new Date())
    gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: true,
    })

    isInitialized = true
  }
}

/**
 * Tracks a page view event
 * @param {string} path - URL path (e.g. '/download' or '/')
 * @param {string} title - Page title
 */
export function logPageView(path = window.location.pathname, title = document.title) {
  if (typeof window === 'undefined' || !window.gtag || !GA_MEASUREMENT_ID) return

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  })
}

/**
 * Tracks custom user interactions and events
 * @param {string} action - Event name (e.g. 'download_apk', 'contact_submit', 'social_click')
 * @param {object} params - Additional event properties
 */
export function trackEvent(action, params = {}) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', action, params)
}
