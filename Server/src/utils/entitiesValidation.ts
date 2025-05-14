import { z } from 'zod'
import { ValidationError } from '@/utils/Errors'
export function entitiesValidation<T>(schema: z.ZodSchema, body: T) {
    const validationResult = schema.safeParse(body)

    if (!validationResult.success) {
        const formattedErrors = validationResult.error.issues.map((issue) => ({
            message: issue.message,
            field: issue.path[0]?.toString() || undefined
        }))

        throw new ValidationError(formattedErrors)
    }

    return validationResult.data as T
}
