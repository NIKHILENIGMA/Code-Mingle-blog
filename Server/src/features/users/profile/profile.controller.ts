import { NextFunction, Request, Response } from 'express'
import { AsyncHandler } from '../../../utils/AsyncHandler'
import { ApiError } from '../../../utils/ApiError'
import responseMessage from '../../../constant/responseMessage'
import { ApiResponse } from '../../../utils/ApiResponse'
import { ProtectedRequest } from '../../../types/app-request'
import { UpdateUserDTO, User } from '../../../Lib/Models/User'
import ProfileService from './profile.service'

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
export const currentUser = (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
        const user = req.user as User

        if (!user) {
            return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Current user').message, {
            user
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
 * Fetch user dashboard controller
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
        await profileServices.getUserDashboardService(req, next, where)
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('User dashboard fetched successfully').message, {})
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

export const changeAvatar = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Promise.resolve()
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Avatar changed successfully').message)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

export const removeAvatar = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Promise.resolve()
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Avatar removed successfully').message)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

export const uploadAvatar = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Promise.resolve()
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Avatar uploaded successfully').message)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

export const uploadCoverPhoto = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Promise.resolve()
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Cover photo uploaded successfully').message)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

export const removeCoverPhoto = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Promise.resolve()
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Cover photo removed successfully').message)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

export const changeCoverPhoto = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Promise.resolve()
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Cover photo changed successfully').message)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

export const userPublicProfile = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Promise.resolve()
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('User profile fetched successfully').message, {})
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})
