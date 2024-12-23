import { Request, Response, NextFunction } from 'express'
import { z, AnyZodObject } from 'zod'
import { ApiError } from '../utils/ApiError'

/**
 * Middleware to validate the request body against a schema
 * @param schema Zod schema to validate the request body against
 * @returns Middleware function that validates the request body
 */

export const validateBody = <T extends AnyZodObject>(schema: T) => {
    return (req: Request, _: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body) as z.infer<T>;
            next()
        } catch (error) {
            if (error instanceof z.ZodError) {
                return ApiError(new Error(`Schema Error: ${error.errors[0].message}`), req, next, 400)
            }
            next(error)
        }
    }
}

/**
 * Middleware to validate the request params against a schema
 * @param schema Zod schema to validate the request params against
 * @returns Middleware function that validates the request params 
 */

export const validateParams = <T extends AnyZodObject>(schema: T) => {
    return (req: Request, _: Response, next: NextFunction) => {
        try {
            req.params = schema.parse(req.params) as z.infer<T>;
            next()
        } catch (error) {
            if (error instanceof z.ZodError) {
                return ApiError(new Error(`Schema Error: ${error.errors[0].message}`), req, next, 400)
            }
            next(error)
        }
    }
}

/**
 * Middleware to validate the request query against a schema
 * @param schema Zod schema to validate the request query against
 * @returns Middleware function that validates the request query
 */

export const validateQuery = <T extends AnyZodObject>(schema: T) => {
    return (req: Request, _: Response, next: NextFunction) => {
        try {
            req.query = schema.parse(req.query) as z.infer<T>;
            next()
        } catch (error) {
            if (error instanceof z.ZodError) {
                return ApiError(new Error(`Schema Error: ${error.errors[0].message}`), req, next, 400)
            }
            next(error)
        }
    }
}
