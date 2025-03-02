import { jwtDecode } from "jwt-decode";

interface DecodedJWTPayload {
  issuer: string;
  audience: string;
  subject: string;
  param: string;
  validity: number;
  iat: number;
}

interface TokenValidationResult {
  inValid?: boolean;
  message?: string;
  isValid?: boolean;
  error?: string;
}

/**
 * Retrieves the access token from local storage
 * @returns {string | null} The access token if it exists, null otherwise
 */
export function getAccessToken(name: string): string | null {
  return localStorage.getItem(name);
}

/**
 * Stores the access token in local storage
 * @param {string} token - The access token to store
 * @returns {void}
 */
export function setAccessToken(token: string): void {
  localStorage.setItem("__acc", token);
}

/**
 * Removes an access token from local storage
 * @param {string} name - The name of the token to remove
 * @returns {string | void} Error message if name is invalid, void otherwise
 */
export function removeAccessToken(name: string): string | void {
  if (name !== undefined && name !== null) return "Invalid name for the token";
  localStorage.removeItem(name);
}

/**
 * Clears all tokens from local storage
 * @returns {void}
 */
export function clearLocalStorage(): void {
  localStorage.clear();
}

/**
 * Retrieves the persist value from local storage
 * @param {string} name - The name of the token to retrieve
 * @returns {string | null} The value of the token if it exists, null otherwise
 */
export function getPersist(name: string): string | null {
  return localStorage.getItem(name);
}

/**
 * Sets the persist value in local storage
 * @param {string} name - The name of the token to set
 * @returns {void}
 */
export function setPersist(name: string): void {
  localStorage.setItem(name, "true");
}

/**
 * Removes the persist value from local storage
 * @param {string} name - The name of the token to remove
 * @returns {void}
 */
export function removePersist(name: string): void {
  localStorage.removeItem(name);
}

/**
 * Decodes a JWT token
 * @param {string} token - The JWT token to decode
 * @returns {DecodedJWTPayload} The decoded token payload
 */
export function getDecodedToken(token: string): DecodedJWTPayload {
  const decoded: DecodedJWTPayload = jwtDecode(token);

  return decoded;
}

/**
 * Checks if a token exists and is valid
 * @param {string} token - The token to validate
 * @returns {boolean | string} "No token found" if token doesn't exist,
 *                            boolean indicating if token is expired otherwise
 */
export function checkTokenValidity(token: string): boolean | string {
  // If token does not exist return false
  if (!token) return "No token found";

  // If token exist check it validity
  if (token) {
    return isTokenExpired(token);
  }

  return false;
}

/**
 * Checks if a token has expired
 * @param {string} token - The token to check
 * @returns {boolean} True if token is expired, false otherwise
 */
export function isTokenExpired(token: string): boolean {
  const decoded = getDecodedToken(token);
  const currentTime = Math.floor(Date.now() / 1000);

  return decoded.validity + decoded.iat < currentTime;
}

/**
 * Validates the structure of a JWT token
 * @param {string} token - The token to validate
 * @returns {Object} Object containing validation result and error message if any
 */

export function checkTokenStructure(
  token: string
): TokenValidationResult | boolean {
  // Check if token exist
  if (!token)
    return {
      inValid: true,
      message: "No token found",
    };

  // check the token is in 3 parts
  const parts: string[] = token.split(".");
  if (parts.length !== 3) {
    return {
      isValid: false,
      error: "Invalid token structure. JWT should have 3 parts",
    };
  }

  return true;
}
