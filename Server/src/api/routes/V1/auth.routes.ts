// Auth routes for handling user authentication and authorization.
import { Router } from 'express'
import { forgotPassword, login, logout, refreshAccessToken, resetPassword, signup } from '@/features/users/authentication/auth.controller'
import { isAuthenticated } from '@/api/middlewares'
const router = Router()

/**
 * Route for user signup.
 * @name post/signup
 * @function
 * @memberof module:auth.routes
 * @inner
 * @param {function} validateBody - Middleware to validate request body against signupSchema.
 * @param {function} signup - Controller function to handle user signup.
 */
router.route('/signup').post(signup)

/**
 * Route for user login.
 * @name post/login
 * @function
 * @memberof module:auth.routes
 * @inner
 * @param {function} validateBody - Middleware to validate request body against loginSchema.
 * @param {function} login - Controller function to handle user login.
 */
router.route('/login').post(login)

/**
 * Route for user logout.
 * @name delete/logout
 * @function
 * @memberof module:auth.routes
 * @inner
 * @param {function} isAuthenticated - Middleware to check if user is authenticated.
 * @param {function} logout - Controller function to handle user logout.
 */
router.route('/logout').delete(isAuthenticated, logout)

/**
 * Route for password recovery.
 * @name post/password-recovery
 * @function
 * @memberof module:auth.routes
 * @inner
 * @param {function} forgotPassword - Controller function to handle password recovery.
 */
router.route('/password-recovery').post(forgotPassword)

/**
 * Route for resetting password.
 * @name post/reset-password
 * @function
 * @memberof module:auth.routes
 * @inner
 * @param {function} resetPassword - Controller function to handle password reset.
 */
router.route('/reset-password').post(resetPassword)

/**
 * Route for refreshing token.
 * @name post/refresh-token
 * @function
 * @memberof module:auth.routes
 * @inner
 * @param {function} refreshToken - Controller function to handle token refresh.
 */
router.route('/refresh-token').post(refreshAccessToken)

export default router
