import { Schema } from 'zod'

/**
 * Validates and parses the request body against a Zod schema
 * @param schema - The Zod schema to validate against
 * @param body - The request body to validate
 * @returns The validated and parsed body
 * @throws {ZodError} If validation fails
 */
export function validateBody<T>(schema: Schema, body: T): T {
    return schema.parse(body) as T
}


/**
 * Validates and parses URL parameters against a Zod schema
 * @param schema - The Zod schema to validate against
 * @param params - The URL parameters to validate
 * @returns The validated and parsed parameters
 * @throws {ZodError} If validation fails
 */
export function validateParams<T>(schema: Schema, params: T): T {
    return schema.parse(params) as T
}

/**
 * Validates and parses query parameters against a Zod schema
 * @param schema - The Zod Schema to validate against
 * @param query - The URL query parameters to validate
 * @returns The validated and parsed query parameters
 * @throws {ZodError} If validation fails
 */
export function validateQuery<T>(schema: Schema, query: T): T {
    return schema.parse(query) as T
}