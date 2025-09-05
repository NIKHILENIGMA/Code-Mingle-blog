// Auth routes for handling user authentication and authorization.
import { Router } from 'express'
import { changeUserPassword, currentUser, forgotPassword, googleLoginCallback, googleSignUpCallback, login, logout, refreshAccessToken, resetPassword, signup } from '@/features/authentication/auth.controller'
import { isAuthenticated } from '@/api/middlewares'

// Create a new router instance
const router = Router()

// Public routes
// These routes do not require authentication and can be accessed by anyone.
router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/refresh-token').post(refreshAccessToken)
router.route('/google-login-callback').post(googleLoginCallback)
router.route('/google-signup-callback').post(googleSignUpCallback)

// Todo: Implement password recovery and reset functionality
router.route('/password-recovery').post(forgotPassword)
router.route('/reset-password').post(resetPassword)

// Protected routes
router.route('/logout').delete(isAuthenticated, logout)
router.route('/current-user').get(isAuthenticated, currentUser)
router.route('/change-password').put(isAuthenticated, changeUserPassword)


export default router
