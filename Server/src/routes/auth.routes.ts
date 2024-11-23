// Auth routes for handling user authentication and authorization.
import { Router } from 'express'
import { forgotPassword, login, logout, resetPassword, signup } from '../controllers/auth.controller'
import { isAuthenticated } from '../middleware/authentication.middleware'
import { validateSchema } from '../middleware/validateSchema.middleware'
import { signupSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from '../schemas/user.schema'

const router = Router()

/**
 * Route for user signup.
 * @name post/signup
 * @function
 * @memberof module:auth.routes
 * @inner
 * @param {function} validateSchema - Middleware to validate request body against signupSchema.
 * @param {function} signup - Controller function to handle user signup.
 */
router.route('/signup').post(validateSchema(signupSchema), signup)

/**
 * Route for user login.
 * @name post/login
 * @function
 * @memberof module:auth.routes
 * @inner
 * @param {function} validateSchema - Middleware to validate request body against loginSchema.
 * @param {function} login - Controller function to handle user login.
 */
router.route('/login').post(validateSchema(loginSchema), login)

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
router.route('/password-recovery').post(validateSchema(forgotPasswordSchema), forgotPassword)

/**
 * Route for resetting password.
 * @name post/reset-password
 * @function
 * @memberof module:auth.routes
 * @inner
 * @param {function} resetPassword - Controller function to handle password reset.
 */
router.route('/reset-password').post(validateSchema(resetPasswordSchema),resetPassword)

export default router