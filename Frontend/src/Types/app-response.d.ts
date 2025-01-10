/**
 * Represents the structure of an API response.
 *
 * @template T - The type of the data contained in the response.
 *
 * @property {boolean} success - Indicates whether the API request was successful.
 * @property {number} statusCode - The HTTP status code of the response.
 * @property {string} message - A message providing additional information about the response.
 * @property {Object} data - The data object containing the response payload.
 * @property {T} data.draft - The actual data returned by the API.
 */
export type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};
