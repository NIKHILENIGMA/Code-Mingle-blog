// This file contains the types for the authentication feature

/**
 * Interface representing the sign-up credentials for a user.
 * This interface is used to structure the data required for user registration.
 *
 * @interface SignupCredentials
 *
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password chosen by the user.
 */
export interface SignupCredentials {
    firstName: string
    lastName: string
    email: string
    password: string
}

/**
 * Interface representing the login credentials for a user.
 * This interface is used to structure the data required for user login.
 *
 * @interface LoginCredentials
 *
 * @property {string} email - The email address of the user.
 * @property {string} password - The password chosen by the user.
 */
export interface LoginCredentials {
    email: string
    password: string
}

/**
 * Interface representing the reset password credentials for a user.
 * This interface is used to structure the data required for resetting a user's password.
 *
 * @interface ResetCredentials
 *
 * @property {string} token - The token used to verify the user.
 * @property {string} newPassword - The new password chosen by the user.
 */
export interface ResetCredentials {
    token: string
    newPassword: string
}

/**
 * Interface representing the forgot password credentials for a user.
 * This interface is used to structure the data required for resetting a user's password.
 * 
 * @interface ForgotPasswordCredentials
 * 
 * @property {string} email - The email address of the user.
 * 
 */
export interface ForgotPasswordCredentials {
    email: string
}

/**
 * Interface representing the authentication response.
 * This interface is used to structure the data returned after a user is authenticated.
 * 
 * @interface AuthResponse
 * 
 * @property {string} access_token - The access token for the user.
 * @property {string} refresh_token - The refresh token for the user.
 */

export interface AuthResponse {
    access_token: string
    refresh_token: string
}
