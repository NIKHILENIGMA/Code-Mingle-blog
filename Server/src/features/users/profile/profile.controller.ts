import { NextFunction, Response } from 'express'
import { AsyncHandler } from '../../../utils/AsyncHandler'
import { ApiError } from '../../../utils/ApiError'
import responseMessage from '../../../constant/responseMessage'
import { ApiResponse } from '../../../utils/ApiResponse'
import { ProtectedRequest } from '../../../types/extended/app-request'
import { UpdateUserDTO, User } from '../../../Lib/Models/User'
import ProfileService from './profile.service'
import { CloundinaryOption } from '@/types/common/base.types'
import { uploadService } from '../../common/upload.service'

const profileServices = new ProfileService()
const { INTERNAL_SERVICE, SUCCESS, UNAUTHORIZED, NOT_FOUND, METHOD_FAILED } = responseMessage

/**
 ** Controller to get the current authenticated user.
 *
 * @param req - The request object, extended to include the authenticated user.
 * @param res - The response object.
 * @param next - The next middleware function.
 *
 * @returns A response with the current user details or an error if the user is not found.
 *
 * @throws Will throw an error if there is an issue retrieving the current user.
 */
export const currentUser = async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
        const user = req.user as User

        if (!user) {
            return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
        }

        const userDetails = await profileServices.trimUserDetailsService(user)

        if (!userDetails) {
            return ApiError(new Error(NOT_FOUND('current user').message), req, next, NOT_FOUND().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Current user').message, {
            userDetails
        })
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('current user').message), req, next, METHOD_FAILED().code)
    }
}

/**
 * @description Update user profile
 * @param req ProtectedRequest
 * @param res Response
 * @param next NextFunction
 * @returns Promise<Response> - The response object containing the user data.
 */
export const updateUserDetails = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const userId = (req.user as User)?.id

    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    const userDetails = req.body as UpdateUserDTO

    if (!userDetails) {
        return ApiError(new Error(NOT_FOUND('update user details').message), req, next, NOT_FOUND().code)
    }

    try {
        const updatedProfile = await profileServices.updateUserProfileService(req, next, { id: userId }, userDetails)

        if (!updatedProfile) {
            return ApiError(new Error(INTERNAL_SERVICE('update user details').message), req, next, INTERNAL_SERVICE().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Profile updated successfully').message)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(INTERNAL_SERVICE('login service').message), req, next, INTERNAL_SERVICE().code)
    }
})

/**
 * Change user password controller
 *
 * @param req ProtectedRequest
 * @param res Response
 * @param next NextFunction
 * @returns Promise<Response> - The response object containing the user data.
 */
export const changeUserPassword = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const userId: string = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    const { oldPassword, newPassword } = req.body as { oldPassword: string; newPassword: string }

    const where = { id: userId }

    try {
        const updatedPassword = await profileServices.changePasswordService(req, next, where, { oldPassword, newPassword })

        if (!updatedPassword) {
            return ApiError(new Error(METHOD_FAILED('change password').message), req, next, METHOD_FAILED().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Password changed successfully').message)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

/**
 * Delete user account controller
 *
 * @param req ProtectedRequest
 * @param res Response
 * @param next NextFunction
 * @returns Promise<Response> - The response object containing the user data.
 */
export const deleteUserAccount = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Get the user id from the request object
    const userId: string = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Where clause for the user id
    const where = { id: userId }

    // Delete the user account
    try {
        const deletedUserAccount = await profileServices.deleteUserAccountService(req, next, where)

        if (!deletedUserAccount) {
            return ApiError(new Error(METHOD_FAILED('delete user account').message), req, next, METHOD_FAILED().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('User deleted successfully').message)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

/**
 *! Fetch user dashboard controller
 *
 * @param req ProtectedRequest
 * @param res Response
 * @param next NextFunction
 * @returns Promise<Response> - The response object containing the user data.
 */
export const userDashboard = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Get the user id from the request object
    const userId: string = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Where clause for the user id
    const where = { id: userId }

    // Fetch the user dashboard
    try {
        const dashboard = await profileServices.getUserDashboardService(req, next, where)
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('User dashboard fetched successfully').message, { dashboard })
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

/**
 *! Upload user avatar controller
 *
 * @param req ProtectedRequest
 * @param res Response
 * @param next NextFunction
 * @returns Promise<Response> - The response object containing the user data.
 *
 * @throws Will throw an error if the user id is not found.
 */
export const uploadAvatar = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Get the user id from the request object
    const avatarPath = (req.file as Express.Multer.File)?.path
    // Where clause for the user id
    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Cloudinary options for uploading the avatar
    const cloudinaryOption: CloundinaryOption = {
        folder: 'avatars',
        public_name: 'user_avatar',
        quality: 50,
        resource: 'image',
        altName: 'User avatar'
    }

    //  Where clause for the user id
    const where = { id: userId }

    //  Upload the avatar
    try {
        const avatarURL = await uploadService.uploadFile(req, next, where, avatarPath, cloudinaryOption)
        if (!avatarURL) {
            return ApiError(new Error(METHOD_FAILED('upload avatar').message), req, next, METHOD_FAILED().code)
        }

        // Update the user profile with the avatar URL
        await profileServices.updateUserProfileService(req, next, where, { avatarImg: avatarURL })

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Avatar uploaded successfully').message)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

/**
 *! Change user avatar controller
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns Promise<Response> - The response object containing the user data.
 *
 * @throws Will throw an error if the user id is not found.
 *
 */
export const changeAvatar = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Get the user id from the request object
    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    //  Get the new avatar path
    const newAvatarPath = (req.file as Express.Multer.File)?.path

    // Where clause for the user id
    const where = { id: userId }

    // Cloudinary options for uploading the avatar
    const cloudinaryOption: CloundinaryOption = {
        folder: 'avatars',
        public_name: 'user_avatar',
        quality: 50,
        resource: 'image',
        altName: 'User avatar'
    }
    try {
        const newAvatarURL = await uploadService.uploadFile(req, next, where, newAvatarPath, cloudinaryOption)
        if (!newAvatarURL) {
            return ApiError(new Error(METHOD_FAILED('change avatar').message), req, next, METHOD_FAILED().code)
        }

        await profileServices.updateUserProfileService(req, next, where, { avatarImg: newAvatarURL })
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Avatar changed successfully').message)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

/**
 *! Remove user avatar controller
 *
 * @param req ProtectedRequest
 * @param res Response
 * @param next NextFunction
 * @returns Promise<Response> - The response object containing the user data.
 *
 * @throws Will throw an error if the user id is not found.
 */
export const removeAvatar = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Get the user id from the request object
    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // The public ID of the image to be deleted
    const public_id = `avatars/user_avatar-${userId}`

    try {
        // Remove the avatar from Cloudinary
        await uploadService.removeImage(req, next, public_id)

        //  Update the user profile with the avatar URL
        await profileServices.updateUserProfileService(req, next, { id: userId }, { avatarImg: '' })

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Avatar removed successfully').message)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

/**
 *! Upload cover photo controller
 *
 * @param req ProtectedRequest
 * @param res Response
 *  @param next NextFunction
 * @returns Promise<Response> - The response object containing the user data.
 *
 * @throws Will throw an error if the user id is not found.
 */
export const uploadCoverPhoto = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Get the user id from the request object
    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Get the cover photo path
    const coverPhotoPath = (req.file as Express.Multer.File)?.path
    if (!coverPhotoPath) {
        return ApiError(new Error(NOT_FOUND('cover photo').message), req, next, NOT_FOUND().code)
    }

    // Where clause for the user id
    const where = { id: userId }

    // Cloudinary options for uploading the cover photo
    const cloudinaryOption: CloundinaryOption = {
        folder: 'cover-photos',
        public_name: 'cover_photo',
        quality: 50,
        resource: 'image',
        altName: 'Cover photo'
    }
    try {
        // Upload the cover photo to Cloudinary
        const coverImageURL = await uploadService.uploadFile(req, next, where, coverPhotoPath, cloudinaryOption)
        if (!coverImageURL) {
            return ApiError(new Error(METHOD_FAILED('upload cover photo url').message), req, next, METHOD_FAILED().code)
        }

        // Update the user profile with the cover photo URL
        await profileServices.updateUserProfileService(req, next, where, { coverImg: coverImageURL })

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Cover photo uploaded successfully').message)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

/**
 *! Change cover photo controller
 *
 * @param req ProtectedRequest
 * @param res Response
 * @param next NextFunction
 * @returns Promise<Response> - The response object containing the user data.
 *
 * @throws Will throw an error if the user id is not found.
 */
export const changeCoverPhoto = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Get the user id from the request object
    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Get the new cover photo path
    const newCoverPhotoPath = (req.file as Express.Multer.File)?.path
    if (!newCoverPhotoPath) {
        return ApiError(new Error(NOT_FOUND('cover photo').message), req, next, NOT_FOUND().code)
    }

    // Where clause for the user id
    const where = { id: userId }

    // Cloudinary options for uploading the cover photo
    const cloudinaryOption: CloundinaryOption = {
        folder: 'cover-photos',
        public_name: 'cover_photo',
        quality: 50,
        resource: 'image',
        altName: 'Cover photo'
    }
    try {
        // Upload the new cover photo to Cloudinary
        const coverImgURL = await uploadService.uploadFile(req, next, where, newCoverPhotoPath, cloudinaryOption)
        if (!coverImgURL) {
            return ApiError(new Error(METHOD_FAILED('change cover photo').message), req, next, METHOD_FAILED().code)
        }

        // Update the user profile with the cover photo URL
        await profileServices.updateUserProfileService(req, next, where, { coverImg: coverImgURL })

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Cover photo changed successfully').message)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

/**
 *! Remove cover photo controller
 *
 * @param req ProtectedRequest
 * @param res Response
 * @param next NextFunction
 * @returns Promise<Response> - The response object containing the user data.
 *
 * @throws Will throw an error if the user id is not found.
 */
export const removeCoverPhoto = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Get the user id from the request object
    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Where clause for the user id
    const where = { id: userId }

    // The public ID of the image to be deleted
    const public_id = `cover-photos/cover_photo-${userId}`
    try {
        // Remove the cover photo from Cloudinary
        await uploadService.removeImage(req, next, public_id)

        // Update the user profile with the cover photo URL
        await profileServices.updateUserProfileService(req, next, where, { coverImg: '' })
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Cover photo removed successfully').message)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

/**
 *! Get user public profile controller
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns Promise<Response> - The response object containing the user data.
 */
export const userPublicProfile = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Get the username from the request parameters
    const username = req.params.username
    if (!username) {
        return ApiError(new Error(NOT_FOUND('user').message), req, next, NOT_FOUND().code)
    }

    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Where clause for the username
    const where = { username }

    try {
        // Fetch the user public profile
        const publicProfile = await profileServices.getPublicProfileService(req, next, where, userId)
        if (!publicProfile) {
            return ApiError(new Error(NOT_FOUND('user profile').message), req, next, NOT_FOUND().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('User profile fetched successfully').message, { publicProfile })
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})
