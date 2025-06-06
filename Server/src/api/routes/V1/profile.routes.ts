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
    userDashboard
} from '@/features/users/profile/profile.controller'
import { isAuthenticated } from '@/api/middlewares'
import { upload } from '@/api/middlewares/multer.middleware'

const router = Router()

// ------------------------------------------- PUBLIC ROUTES ------------------------------------------------
router.route('/get-user/:username').get()
router.route('/me/dashboard').get(userDashboard)

// ------------------------------------------ PRIVATE ROUTES ------------------------------------------------
router.route('/get-user').get(isAuthenticated, currentUser)
router.route('/me/update-details').patch(isAuthenticated, updateUserDetails)
router.route('/me/change-password').patch(isAuthenticated, changeUserPassword)
router.route('/me/delete-account').delete(isAuthenticated, deleteUserAccount)
router
    .route('/me/avatar')
    .post(isAuthenticated, upload.single('avatarImg'), uploadAvatar)
    .patch(isAuthenticated, upload.single('avatarImg'), changeAvatar)
    .delete(isAuthenticated, removeAvatar)

router
    .route('/me/cover-image')
    .post(isAuthenticated, upload.single('coverImg'), uploadCoverPhoto)
    .patch(isAuthenticated, upload.single('coverImg'), changeCoverPhoto)
    .delete(isAuthenticated, upload.single('coverImg'), removeCoverPhoto)

export default router
