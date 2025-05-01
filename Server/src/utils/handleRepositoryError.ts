import { ERROR_TYPES } from '@/constant/error-types'
import { logger } from './logger/index'
import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library'
import { AppError } from './ApiError'
/**
 *  Handles errors from the Prisma client and throws appropriate AppError instances.
 *
 * @param error - The error object thrown by Prisma client.
 * @param operation - The name of the operation that caused the error.
 */
export const handleRepositoryError = (error: unknown, operation: string) => {
    logger.error('Error in PrismaDraftRepository:', {
        message: (error as Error).message,
        stack: (error as Error).stack,
        operation
    })

    if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P1001':
                throw AppError.from(
                    {
                        code: 503,
                        message: ERROR_TYPES.VALIDATION_ERROR(`${operation}: Database service is currently unavailable. Please try again later.`)
                            .message
                    },
                    error
                )

            case 'P2002':
                throw AppError.from(
                    {
                        code: 400,
                        message: ERROR_TYPES.VALIDATION_ERROR(`${operation}: A record with these details already exists`).message
                    },
                    error
                )

            case 'P2003':
                throw AppError.from(
                    {
                        code: 400,
                        message: ERROR_TYPES.VALIDATION_ERROR(`${operation}: Referenced record does not exist`).message
                    },
                    error
                )

            case 'P2025':
                throw AppError.from(
                    {
                        code: 404,
                        message: ERROR_TYPES.NOT_FOUND(`${operation}: Record to update not found`).message
                    },
                    error
                )

            default:
                throw AppError.from(
                    {
                        code: 500,
                        message: 'Database operation failed. Please try again later.'
                    },
                    error
                )
        }
    } else if (error instanceof PrismaClientValidationError) {
        throw AppError.from(
            {
                code: 400,
                message: ERROR_TYPES.VALIDATION_ERROR(`${operation}: Validation error`).message
            },
            error
        )
    } else if (error instanceof PrismaClientInitializationError) {
        throw AppError.from(
            {
                code: 503,
                message: ERROR_TYPES.INTERNAL_SERVICE(`${operation}: Database service is currently unavailable. Please try again later.`).message
            },
            error
        )
    }
}
