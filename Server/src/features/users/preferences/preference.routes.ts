import { Router } from 'express'
import {
    userPreference,
    updateUserPreference,
    userThemePreference,
    updateUserThemePreference,
    userSettingsPreference,
    updateUserSettingsPreference
} from './preference.controller'

const router = Router()

router.route('/me/preference').post(userPreference)
router.route('/me/preference').patch(updateUserPreference)
router.route('/me/preference/theme').post(userThemePreference)
router.route('/me/preference/theme').patch(updateUserThemePreference)
router.route('/me/preference/settings').post(userSettingsPreference)
router.route('/me/preference/settings').patch(updateUserSettingsPreference)

export default router
