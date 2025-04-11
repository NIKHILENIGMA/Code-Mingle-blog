/**
 *  Truncate a string to a specified length and append ellipsis if it exceeds that length.
 * @param text
 * @param maxLength
 * @returns  {string} - The truncated string with ellipsis if it exceeds the maxLength.
 */

const truncate = (text: string, maxLength: number) =>
  text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

export default truncate;
