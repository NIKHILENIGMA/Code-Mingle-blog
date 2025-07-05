import { z } from 'zod'
import { LoginSchema, LoginSchemaType, SignupSchema, SignupSchemaType } from './authSchema'

export const validateSchema = <T>(
  schema: z.ZodSchema,
  data: T,
): {
  isValid: boolean
  errors: string[] | null
} => {
  try {
    schema.parse(data)
    return { isValid: true, errors: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map((err) => err.message),
      }
    }
    return { isValid: false, errors: ['Unknown validation error'] }
  }
}

// Validate functions for login and signup schemas
export const validateLogin = (data: LoginSchemaType) => {
  return validateSchema(LoginSchema, data)
}

export const validateSignup = (data: SignupSchemaType) => {
  return validateSchema(SignupSchema, data)
}
