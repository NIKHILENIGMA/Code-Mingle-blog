import { UploadApiResponse } from 'cloudinary'
import { CloundinaryOption, UploadOptions } from '@/types/common/base.types'
import { NextFunction, Request } from 'express'
import { ApiError } from '../../utils/ApiError'
import { responseMessage } from '../../constant'
import { deleteFromCloudinary, uploadOnCloudinary } from '../../utils/Cloudinary'
import { ALLOWED_FORMATS, FORMAT, INVALIDATE, MAX_BYTES, OVERWRITE } from '@/config'

const { METHOD_FAILED } = responseMessage

class UploadService {
    constructor() {}
    /**
     * Uploads a file to Cloudinary with the specified options and handles any errors that occur during the upload.
     *
     * @param {Request} req - The HTTP request object.
     * @param {NextFunction} next - The next middleware function.
     * @param {object} where - The object containing the unique identifier of the user.
     * @param {string} path - The path to the file to be uploaded.
     * @param {CloundinaryOption} cloundinaryOption - The Cloudinary upload options.
     * @returns {Promise<UploadApiResponse | void>} The result of the Cloudinary upload or void in case of an error.
     *
     *
     */
    async uploadFile(
        req: Request,
        next: NextFunction,
        where: { id: string },
        path: string,
        cloundinaryOption: CloundinaryOption
    ): Promise<string | void> {
        // Generate Cloudinary options
        const options = this.cloundinaryOption(
            cloundinaryOption.folder,
            where.id,
            cloundinaryOption.public_name,
            cloundinaryOption.quality,
            cloundinaryOption.resource,
            cloundinaryOption.altName
        )

        // Upload image to Cloudinary
        try {
            const image = (await this.cloudinaryUploadService(req, next, options, path)) as UploadApiResponse

            return image.secure_url
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('upload avatar service').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    public async removeImage(req: Request, next: NextFunction, public_id: string): Promise<void> {
        try {
            // Delete image from Cloudinary
            await this.cloudinaryDeleteService(req, next, public_id)
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('Failed to remove avatar').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    /**
     * Uploads an image to Cloudinary with the specified options and handles any errors that occur during the upload.
     *
     * @param {Request} req - The HTTP request object.
     * @param {NextFunction} next - The next middleware function.
     * @param {UploadOptions} options - The Cloudinary upload options.
     * @param {string} imagePath - The file path of the image to be uploaded.
     * @returns {Promise<UploadApiResponse | void>} The result of the Cloudinary upload or void in case of an error.
     */
    private async cloudinaryUploadService(req: Request, next: NextFunction, options: UploadOptions, imagePath: string): Promise<UploadApiResponse | void> {
        try {
            return await uploadOnCloudinary(req, next, options, imagePath)
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('Failed upload avatar service').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    private async cloudinaryDeleteService(req: Request, next: NextFunction, public_id: string): Promise<void> {
        try {
            await deleteFromCloudinary(req, next, public_id)
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('Failed to delete avatar').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    /**
     * Generates Cloudinary upload options for a user's avatar.
     *
     * @param {string} folderName - The name of the folder where the file will be stored.
     * @param {string} userId - The user's unique identifier.
     * @param {string} public_name - The public name of the uploaded image.
     * @param {number} quality - The quality setting for the uploaded image.
     * @param {'image' | 'auto' | 'raw' | 'video'} resource - The type of resource being uploaded.
     * @param {string} altName - The alternative text for the uploaded image.
     * @returns {UploadOptions} The configured upload options.
     */
    private cloundinaryOption(
        folderName: string,
        userId: string,
        public_name: string,
        quality: number,
        resource: 'image' | 'auto' | 'raw' | 'video',
        altName: string
    ): UploadOptions {
        return {
            folder: folderName,
            public_id: `${public_name}-${userId}`,
            overwrite: OVERWRITE,
            invalidate: INVALIDATE,
            resource_type: resource,
            allowed_formats: ALLOWED_FORMATS,
            format: FORMAT,
            quality,
            max_bytes: MAX_BYTES, // 5MB
            context: { alt: altName, user: userId }
        }
    }
}

export const uploadService = new UploadService()
