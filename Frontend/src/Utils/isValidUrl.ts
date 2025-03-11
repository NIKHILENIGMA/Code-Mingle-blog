/**
 * Validates if a given string is a valid URL
 * @param {string} url - The URL string to validate
 * @returns {boolean} Returns true if the URL is valid, false otherwise
 * @example
 * isValidURL('https://www.example.com') // returns true
 * isValidURL('not-a-url') // returns false
 */

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
