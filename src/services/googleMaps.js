/**
 * Google Maps integration service.
 * Uses safe deep-link approach — no API keys required.
 * Does NOT claim to know the user's polling booth location.
 */

const GOOGLE_MAPS_SEARCH_BASE = 'https://www.google.com/maps/search/';

/**
 * Opens Google Maps search for polling stations near a user-provided location.
 * @param {string} query - The search query (e.g., area name)
 * @returns {string} Google Maps search URL
 */
export function getPollingStationSearchUrl(query = '') {
  const searchTerm = query
    ? `polling+station+near+${encodeURIComponent(query)}`
    : 'polling+station+near+me';
  return `${GOOGLE_MAPS_SEARCH_BASE}${searchTerm}`;
}

/**
 * Generates a Google Maps embed URL for display.
 * Uses the embed API which does not require an API key for basic searches.
 * @param {string} query - The search query
 * @returns {string} Google Maps embed URL
 */
export function getMapEmbedUrl(query = 'polling stations India') {
  return `https://www.google.com/maps/embed/v1/search?key=&q=${encodeURIComponent(query)}`;
}

/**
 * Opens Google Maps search in a new tab safely.
 * @param {string} query - The search query
 */
export function openPollingStationSearch(query = '') {
  const url = getPollingStationSearchUrl(query);
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) {
    newWindow.opener = null;
  }
}
