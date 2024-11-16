import express from 'express'
import { forgotPassword, login, logout, resetPassword, signup } from '../controllers/auth.controller'

const router = express.Router()

router
  .route('/signup')
  .post(signup)

router
  .route('/login')
  .post(login)

router
  .route('/logout')
  .post(logout)

router
  .route('/password-recovery')
  .post(forgotPassword)

router
  .route('/reset-password')
  .post(resetPassword)


export default router
