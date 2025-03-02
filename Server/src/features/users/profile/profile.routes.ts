import { Router } from 'express'
import {
    changeAvatar,
    changeCoverPhoto,
    changeUserPassword,
    currentUser,
    deleteUserAccount,
    removeAvatar,
    removeCoverPhoto,
    updateUserDetails,
    uploadAvatar,
    uploadCoverPhoto,
    userDashboard,
    userPublicProfile
} from './profile.controller'
import { isAuthenticated, validateBody } from '../../../middleware'
import { ProfileChangePasswordSchema, ProfileUpdateBodySchema } from './profile.schema'
import { upload } from '../../../middleware/multer.middleware'
import { validateFile } from '../../../middleware/validateSchema.middleware'

const router = Router()

// Middleware to check if user is authenticated
// ----------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

router.use(isAuthenticated)

// ----------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

/**
 * Route for getting current user.
 * @description: This route is used to get current user.
 * @method GET
 * @param {function} currentUser - Controller function to get current user.
 */

router.route('/get-user').get(currentUser)

/**
 * @description: This route is used to update user details
 * @method PATCH
 * @param {string} path - /me/update
 */
router.route('/me/details').patch(validateBody(ProfileUpdateBodySchema), updateUserDetails)

/**
 * @description: This route is used to change user password
 * @method PATCH
 * @param {string} path - /me/change-password
 */
router.route('/me/change-password').patch(validateBody(ProfileChangePasswordSchema), changeUserPassword)

/**
 * @description: This route is used to delete user account
 * @method DELETE
 * @param {string} path - /me/delete
 */
router.route('/me/delete-account').delete(deleteUserAccount)

/**
 * @description: This route is used to get user dashboard
 * @method GET
 * @param {string} path - /me/dashboard
 */
router.route('/me/dashboard').get(userDashboard)

/**
 * @description: This route is used to upload avatar
 * @method POST
 * @param {string} path - /me/avatar
 */
router.route('/me/avatar/upload').post(upload.single('avatarImg'), validateFile, uploadAvatar)

/**
 * @description: This route is used to change avatar
 * @method PATCH
 * @param {string} path - /me/avatar/change
 */
router.route('/me/avatar/change').patch(upload.single('avatarImg'), validateFile, changeAvatar)

/**
 * @description: This route is used to remove avatar
 * @method DELETE
 * @param {string} path - /me/avatar/remove
 */
router.route('/me/avatar/remove').delete(removeAvatar)

/**
 * @description: This route is used to upload cover photo
 * @method POST
 * @param {string} path - /me/cover-image
 */
router.route('/me/cover-image/upload').post(upload.single('coverImg'), validateFile, uploadCoverPhoto)

/**
 * @description: This route is used to change cover photo
 * @method PATCH
 * @param {string} path - /me/cover-image/change
 */
router.route('/me/cover-image/change').patch(upload.single('coverImg'), validateFile, changeCoverPhoto)

/**
 * @description: This route is used to remove cover photo
 * @method DELETE
 * @param {string} path - /me/cover-image/remove
 */
router.route('/me/cover-image/remove').delete(upload.single('coverImg'), removeCoverPhoto)

/**
 * @description: This route is used to get user public profile
 * @method GET
 * @param {string} path - /:username
 */
router.route('/:username').get(userPublicProfile)

export default router
