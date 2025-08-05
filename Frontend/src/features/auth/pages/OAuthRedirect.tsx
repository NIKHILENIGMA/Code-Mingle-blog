import { FC, useCallback, useEffect } from 'react'
import { authService } from '../services/authApiServices'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { OAuthState } from '../types/authTypes'

const OAuthRedirect: FC = () => {
  const { userAuthenticatedState } = useAuthContext()
  const location = useLocation()
  const navigate = useNavigate()

  const navigateAfterLogin = useCallback(() => {
    const from = (location.state as { from?: Location })?.from?.pathname || '/'
    navigate(from, { replace: true })
  }, [location.state, navigate])

  const redirectToAuthPageWithError = useCallback(
    (message: string, authState?: OAuthState) => {
      const redirectTo = authState === 'signup' ? '/signup' : '/login'
      navigate(redirectTo, {
        replace: true,
        state: { oauthError: message },
      })
    },
    [navigate],
  )

  const handleGoogleCallback = useCallback(async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const state: OAuthState | null = urlParams.get('state')
      ? JSON.parse(urlParams.get('state')!)
      : null
    if (!state) {
      redirectToAuthPageWithError('Invalid or missing state parameter.')
      return
    }

    const code: string = urlParams.get('code')!
    if (!code) {
      redirectToAuthPageWithError(
        'Invalid or missing authorization code.',
        state,
      )
      return
    }
    // Clear the URL parameters to prevent re-triggering the callback
    window.history.replaceState({}, document.title, window.location.pathname)

    let response

    try {
      if (state === 'signup') {
        response = await authService.signupWithGoogle(code)
        // const { success, message, data } = response
        // if (!success || !data?.user || !data?.tokens?.accessToken) {
        //   redirectToAuthPageWithError(
        //     message || 'Google signup failed. Please try again.',
        //     state,
        //   )
        //   return
        // }
        // userAuthenticatedState(data.user, data.tokens.accessToken)
      } else if (state === 'login') {
        response = await authService.loginWithGoogle(code)
        const { success, message, data } = response
        if (!success || !data?.user || !data?.tokens?.accessToken) {
          redirectToAuthPageWithError(
            message || 'Google login failed. Please try again.',
            state,
          )
          return
        }
        userAuthenticatedState(data.user, data.tokens.accessToken)
      } else {
        redirectToAuthPageWithError('Invalid OAuth state.')
        return
      }

      // Save the remember me preference in localStorage
      localStorage.setItem('isPersistent', String(true))

      // Redirect to the page the user was trying to access before login
      navigateAfterLogin()
    } catch (error) {
      redirectToAuthPageWithError(
        `Google login failed. Please try again later. ${(error as Error).message}`,
      )
    }
  }, [navigateAfterLogin, userAuthenticatedState, redirectToAuthPageWithError])

  useEffect(() => {
    handleGoogleCallback()
  }, [handleGoogleCallback])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="w-12 h-12 border-b-2 rounded-full border-primary animate-spin"></div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            Redirecting...
          </h1>
          <p className="max-w-md mx-auto text-muted-foreground">
            Please wait while we complete your authentication and redirect you
            to the application.
          </p>
        </div>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
          <div
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default OAuthRedirect
