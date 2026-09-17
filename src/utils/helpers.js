/**
 * Utility functions for the ElectionFlow application.
 */

/**
 * Validates that a URL is from a trusted domain.
 * Only allows known official election-related domains.
 * @param {string} url - The URL to validate
 * @returns {boolean} Whether the URL is from a trusted source
 */
export function isTrustedUrl(url) {
  try {
    const parsed = new URL(url);
    const trustedDomains = [
      'eci.gov.in',
      'voters.eci.gov.in',
      'electoralsearch.eci.gov.in',
      'results.eci.gov.in',
      'google.com',
      'www.google.com',
    ];
    return trustedDomains.some(
      (domain) => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
}

/**
 * Safely opens an external URL in a new tab.
 * @param {string} url - The URL to open
 * @returns {boolean} Whether the URL was opened successfully
 */
export function safeOpenExternal(url) {
  if (!isTrustedUrl(url)) {
    return false;
  }
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) {
    newWindow.opener = null;
  }
  return true;
}

/**
 * Generates safe external link props for anchor tags.
 * @param {string} url - The URL for the link
 * @returns {object} Props to spread on an anchor tag
 */
export function getExternalLinkProps(url) {
  return {
    href: url,
    target: '_blank',
    rel: 'noopener noreferrer',
  };
}

/**
 * Gets a user-friendly score message based on quiz percentage.
 * @param {number} percentage - The quiz score percentage
 * @returns {string} A friendly message
 */
export function getScoreMessage(percentage) {
  if (percentage === 100) return 'Perfect score! You\'re an election expert! 🎉';
  if (percentage >= 80) return 'Excellent! You have strong election knowledge! 🌟';
  if (percentage >= 60) return 'Good job! You know the basics well. 👍';
  if (percentage >= 40) return 'Not bad! Review the explanations to learn more. 📖';
  return 'Keep learning! Check the Election Journey to build your knowledge. 🌱';
}
