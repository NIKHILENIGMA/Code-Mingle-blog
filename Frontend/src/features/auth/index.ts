// Components
import { AuthProvider } from './components/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

// Hooks
import { useAuthContext } from './hooks/useAuthContext'
import { useAuthentication } from './hooks/useAuthentication'

// Pages
import ForgotPassword from './pages/ForgotPassword'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ResetPassword from './pages/ResetPassword'

// Schema
import {
  SignupSchema,
  LoginSchema,
  ResetPasswordSchema,
} from './schema/authSchema'
import {
  validateLogin,
  validateSchema,
  validateSignup,
} from './schema/validations'

// Services

// Types

export {
  AuthProvider,
  ProtectedRoute,
  useAuthContext,
  useAuthentication,
  ForgotPassword,
  Login,
  Signup,
  ResetPassword,
  SignupSchema,
  LoginSchema,
  ResetPasswordSchema,
  validateLogin,
  validateSchema,
  validateSignup,
}
