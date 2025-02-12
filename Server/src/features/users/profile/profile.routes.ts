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
import { isAuthenticated } from '../../../middleware/authentication.middleware'

const router = Router()

// Middleware to check if user is authenticated
// --------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------

router.use(isAuthenticated)

// --------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------

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
router.route('/me/update').patch(updateUserDetails)

/**
 * @description: This route is used to change user password
 * @method PATCH
 * @param {string} path - /me/change-password
 */
router.route('/me/change-password').patch(changeUserPassword)

/**
 * @description: This route is used to delete user account
 * @method DELETE
 * @param {string} path - /me/delete
 */
router.route('/me/delete').delete(deleteUserAccount)

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
router.route('/me/avatar').post(uploadAvatar)

/**
 * @description: This route is used to change avatar
 * @method PATCH
 * @param {string} path - /me/avatar/change
 */
router.route('/me/avatar/change').patch(changeAvatar)

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
router.route('/me/cover-image').post(uploadCoverPhoto)

/**
 * @description: This route is used to change cover photo
 * @method PATCH
 * @param {string} path - /me/cover-image/change
 */
router.route('/me/cover-image/change').patch(changeCoverPhoto)

/**
 * @description: This route is used to remove cover photo
 * @method DELETE
 * @param {string} path - /me/cover-image/remove
 */
router.route('/me/cover-image/remove').delete(removeCoverPhoto)

/**
 * @description: This route is used to get user public profile
 * @method GET
 * @param {string} path - /:username
 */
router.route('/:username').get(userPublicProfile)

export default router
