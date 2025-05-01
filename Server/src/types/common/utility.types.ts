/**
 * Represents metadata associated with a log entry.
 * This interface allows for flexible key-value pairs while providing
 * optional properties for common logging details.
 *
 * @property {string} [requestId] - A unique identifier for the request.
 * @property {string} [userId] - The identifier of the user associated with the log entry.
 * @property {string} [path] - The request path or endpoint being logged.
 * @property {string} [method] - The HTTP method (e.g., GET, POST) of the request.
 * @property {Record<string, unknown>} [key: string] - Additional metadata as key-value pairs.
 */

export interface LogMetadata {
    [key: string]: unknown
    requestId?: string
    userId?: string
    path?: string
    method?: string
}
