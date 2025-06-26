import { APPCONFIG } from '@/app/config'

const directUserToGoogleConsentScreen = () => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${APPCONFIG.GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(APPCONFIG.GOOGLE_REDIRECT_URI)}&response_type=${APPCONFIG.GOOGLE_RESPONSE_TYPE}&scope=${encodeURIComponent(APPCONFIG.GOOGLE_SCOPE)}&access_type=${APPCONFIG.GOOGLE_ACCESS_TYPE}&prompt=${APPCONFIG.GOOGLE_PROMPT}`

  window.location.href = authUrl
}

export default directUserToGoogleConsentScreen
