import { z, AnyZodObject } from 'zod'
import { Request, Response, NextFunction } from 'express'
import { BadRequestError, ValidationError } from '@/utils/Errors'
import { StandardError } from '@/utils/Errors/StandardError'

/**
 * Middleware to validate the request body against a schema
 * @param schema Zod schema to validate the request body against
 * @returns Middleware function that validates the request body
 */

export const validateBody = <T extends AnyZodObject>(schema: T) => {
    return (req: Request, _: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body) as z.infer<T>
            next()
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new ValidationError(error.errors.map((err) => ({ message: err.message, field: err.path.join('.') })))
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
            req.params = schema.parse(req.params) as z.infer<T>
            next()
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new ValidationError(error.errors.map((err) => ({ message: err.message, field: err.path.join('.') })))
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
            req.query = schema.parse(req.query) as z.infer<T>
            next()
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new ValidationError(error.errors.map((err) => ({ message: err.message, field: err.path.join('.') })))
            }
            next(error)
        }
    }
}

export const validateFile = <T extends AnyZodObject>(schema: T, file: File) => {
    return (_: Request, __: Response, next: NextFunction) => {
        if (file) {
            throw new BadRequestError('File does not provided')
        }

        try {
            schema.parse(file) // Validate file using the schema
            next()
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new ValidationError(error.errors.map((err) => ({ message: err.message, field: err.path.join('.') })))
            }
            if (error instanceof StandardError) {
                throw error // Re-throw other unexpected errors
            }

            next(error) 
            
        }

        next() // Proceed if validation is successful
    }
}
