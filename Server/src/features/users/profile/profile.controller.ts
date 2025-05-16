import { Request, Response } from 'express'
import { ApiResponse, AsyncHandler, entitiesValidation } from '@/utils'
import profileServices from './profile.service'
import { CloundinaryOption } from '@/types/common/base.types'
import { uploadService } from '../../common/upload.service'
import { DatabaseError, InternalServerError, UnauthorizedError } from '@/utils/Errors'
import { ProfileChangePasswordCredentials, UpdateProfileCredentials } from './profile.types'
import { ProfileChangePasswordSchema, ProfileUpdateBodySchema } from '@/api'



export const currentUser = (req: Request, res: Response) => {
    const user = req.user
    if (!user) {
        throw new UnauthorizedError('User is not logged in')
    }

    ApiResponse(req, res, 200, 'Current user', { user })
}

export const updateUserDetails = AsyncHandler(async (req: Request, res: Response) => {
    const userId: string | undefined = req.user?.id
    if (!userId || userId === undefined) {
        throw new UnauthorizedError('User is not logged in')
    }

    // Validate the request body
    const body = req.body as UpdateProfileCredentials

    // Check if the request body is empty
    const validateData = entitiesValidation<UpdateProfileCredentials>(ProfileUpdateBodySchema, body)

    // save the updated user details
    await profileServices.updateUserProfileService(userId, validateData)

    ApiResponse(req, res, 200, 'Profile updated successfully', {})
})

export const changeUserPassword = AsyncHandler(async (req: Request, res: Response) => {
    const userId: string | undefined = req.user?.id
    if (!userId || userId === undefined) {
        throw new UnauthorizedError('User is not logged in')
    }

    const body = req.body as ProfileChangePasswordCredentials

    const validateData = entitiesValidation<ProfileChangePasswordCredentials>(ProfileChangePasswordSchema, body)

    await profileServices.changePasswordService(userId, validateData)

    ApiResponse(req, res, 200, 'Password changed successfully')
})

export const deleteUserAccount = AsyncHandler(async (req: Request, res: Response) => {
    // Get the user id from the request object
    const userId: string | undefined = req.user?.id
    if (!userId || userId === undefined) {
        throw new UnauthorizedError('User is not logged in')
    }

    // Delete the user account
    const deletedUserAccount = await profileServices.deleteAccountService(userId)

    if (!deletedUserAccount) {
        throw new DatabaseError('User account not found')
    }

    ApiResponse(req, res, 200, 'User deleted successfully')
})

export const userDashboard = AsyncHandler(async (req: Request, res: Response) => {
    // Get the user id from the request object
    const userId: string | undefined = req.user?.id
    if (!userId || userId === undefined) {
        throw new UnauthorizedError('User is not logged in')
    }

    // Fetch the user dashboard
    const dashboard = await profileServices.getProfileDetailsService(userId)
    if (!dashboard) {
        throw new DatabaseError('User dashboard details not found')
    }

    ApiResponse(req, res, 200, 'User dashboard fetched successfully', { dashboard })
})

export const getUserProfile = AsyncHandler(async (req: Request, res: Response) => {
    // Get the user id from the request object
    const userId: string | undefined = req.user?.id
    if (!userId || userId === undefined) {
        throw new UnauthorizedError('User is not logged in')
    }

    const dashboardDetails = await profileServices.getProfileDetailsService(userId)
    if (!dashboardDetails) {
        throw new DatabaseError('User dashboard details not found')
    }

    const isFollowStatus = await profileServices.getFollowingStatus(userId, dashboardDetails.id) 
    if (isFollowStatus === undefined) {
        throw new DatabaseError('User follow status not found')
    }

    const userProfile = {
        ...dashboardDetails,
        isFollowing: isFollowStatus
    }

    ApiResponse(req, res, 200, 'User profile fetched successfully', { userProfile })
})

export const uploadAvatar = AsyncHandler(async (req: Request, res: Response) => {
    // Get the user id from the request object
    const avatarPath = (req.file as Express.Multer.File)?.path
    // Get the user id from the request object
    const userId: string | undefined = req.user?.id
    if (!userId || userId === undefined) {
        throw new UnauthorizedError('User is not logged in')
    }

    // Cloudinary options for uploading the avatar
    const cloudinaryOption: CloundinaryOption = {
        folder: 'avatars',
        public_name: 'user_avatar',
        quality: 50,
        resource: 'image',
        altName: 'User avatar'
    }

    //  Upload the avatar
    const avatarURL = await uploadService.uploadFile(userId, avatarPath, cloudinaryOption)
    if (!avatarURL) {
        throw new DatabaseError('Cloudinary avatar safe url missing')
    }
    // Update the user profile with the avatar URL
    await profileServices.updateUserProfileService(userId, { profileImage: avatarURL })

    ApiResponse(req, res, 200, 'Avatar uploaded successfully')
})

export const changeAvatar = AsyncHandler(async (req: Request, res: Response) => {
    // Get the user id from the request object
    const userId: string | undefined = req.user?.id
    if (!userId || userId === undefined) {
        throw new UnauthorizedError('User is not logged in')
    }

    //  Get the new avatar path
    const newAvatarPath = (req.file as Express.Multer.File)?.path

    // Cloudinary options for uploading the avatar
    const cloudinaryOption: CloundinaryOption = {
        folder: 'avatars',
        public_name: 'user_avatar',
        quality: 50,
        resource: 'image',
        altName: 'User avatar'
    }
    const newAvatarURL = await uploadService.uploadFile(userId, newAvatarPath, cloudinaryOption)
    if (!newAvatarURL) {
        throw new DatabaseError('Cloudinary avatar safe url is missing')
    }

    await profileServices.updateUserProfileService(userId, { profileImage: newAvatarURL })
    return ApiResponse(req, res, 200, 'Avatar changed successfully')
})

export const removeAvatar = AsyncHandler(async (req: Request, res: Response) => {
    // Get the user id from the request object
    const userId: string | undefined = req.user?.id
    if (!userId || userId === undefined) {
        throw new UnauthorizedError('User is not logged in')
    }

    // The public ID of the image to be deleted
    const public_id = `avatars/user_avatar-${userId}`

    // Remove the avatar from Cloudinary
    await uploadService.removeImage(public_id)

    //  Update the user profile with the avatar URL
    await profileServices.updateUserProfileService(userId, { profileImage: '' })

    return ApiResponse(req, res, 200, 'Avatar removed successfully')
})

export const uploadCoverPhoto = AsyncHandler(async (req: Request, res: Response) => {
    // Get the user id from the request object
    const userId: string | undefined = req.user?.id
    if (!userId || userId === undefined) {
        throw new UnauthorizedError('User is not logged in')
    }

    // Get the cover photo path
    const coverPhotoPath = (req.file as Express.Multer.File)?.path
    if (!coverPhotoPath) {
        throw new InternalServerError('Cover photo path is missing')
    }

    // Cloudinary options for uploading the cover photo
    const cloudinaryOption: CloundinaryOption = {
        folder: 'cover-photos',
        public_name: 'cover_photo',
        quality: 50,
        resource: 'image',
        altName: 'Cover photo'
    }
    // Upload the cover photo to Cloudinary
    const coverImageURL = await uploadService.uploadFile(userId, coverPhotoPath, cloudinaryOption)
    if (!coverImageURL) {
        throw new DatabaseError('Cloudinary cover photo safe url is missing')
    }

    // Update the user profile with the cover photo URL
    await profileServices.updateUserProfileService(userId, { coverImage: coverImageURL })

    ApiResponse(req, res, 200, 'Cover photo uploaded successfully')
})

export const changeCoverPhoto = AsyncHandler(async (req: Request, res: Response) => {
    // Get the user id from the request object
    const userId: string | undefined = req.user?.id
    if (!userId || userId === undefined) {
        throw new UnauthorizedError('User is not logged in')
    }

    // Get the new cover photo path
    const newCoverPhotoPath = (req.file as Express.Multer.File)?.path
    if (!newCoverPhotoPath) {
        throw new InternalServerError('New cover photo path is missing')
    }

    // Cloudinary options for uploading the cover photo
    const cloudinaryOption: CloundinaryOption = {
        folder: 'cover-photos',
        public_name: 'cover_photo',
        quality: 50,
        resource: 'image',
        altName: 'Cover photo'
    }
    // Upload the new cover photo to Cloudinary
    const coverImgURL = await uploadService.uploadFile(userId, newCoverPhotoPath, cloudinaryOption)
    if (!coverImgURL) {
        throw new DatabaseError('Cloudinary cover photo safe url is missing')
    }

    // Update the user profile with the cover photo URL
    await profileServices.updateUserProfileService(userId, { coverImage: coverImgURL })

    return ApiResponse(req, res, 200, 'Cover photo changed successfully')
})

export const removeCoverPhoto = AsyncHandler(async (req: Request, res: Response) => {
    // Get the user id from the request object
    const userId: string | undefined = req.user?.id
    if (!userId || userId === undefined) {
        throw new UnauthorizedError('User is not logged in')
    }

    // The public ID of the image to be deleted
    const public_id = `cover-photos/cover_photo-${userId}`
    // Remove the cover photo from Cloudinary
    await uploadService.removeImage(public_id)

    // Update the user profile with the cover photo URL
    await profileServices.updateUserProfileService(userId, { coverImage: '' })
    return ApiResponse(req, res, 200, 'Cover photo removed successfully')
})
