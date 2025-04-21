import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { cloudinaryConfig } from '@/config'
import { ApiError } from './ApiError'
import { NextFunction, Request } from 'express'
import { responseMessage } from '../constant'
import { unlinkSync } from 'node:fs'
import { UploadOptions } from '@/types/common/base.types'

const { INTERNAL_SERVICE, BAD_REQUEST } = responseMessage

/**
 * Configures Cloudinary with the Cloudinary API key, API secret, and cloud name.
 *
 * @param cloudinaryConfig - The Cloudinary configuration object.
 * @returns void
 */
cloudinary.config({
    cloud_name: cloudinaryConfig.CLOUDINARY_CLOUD_NAME,
    api_key: cloudinaryConfig.API_KEY,
    api_secret: cloudinaryConfig.API_SECRET
})

/**
 * Uploads a file to Cloudinary and deletes the local file after upload.
 *
 * @param req - The Express request object.
 * @param next - The Express next function for error handling.
 * @param uploadOptions - Options for uploading the file to Cloudinary.
 * @param localFilePath - The path to the local file to be uploaded.
 * @returns A promise that resolves to the Cloudinary upload response or void if an error occurs.
 *
 * @throws Will throw an error if the local file path is not provided or if the upload fails.
 */
export const uploadOnCloudinary = async (
    req: Request,
    next: NextFunction,
    uploadOptions: UploadOptions,
    localFilePath: string
): Promise<UploadApiResponse | void> => {
    try {
        if (!localFilePath) {
            return ApiError(new Error(BAD_REQUEST('Local file path is required').message), req, next, BAD_REQUEST().code)
        }

        // Upload image on cloudinary
        const response: UploadApiResponse = await cloudinary.uploader.upload(localFilePath, {
            folder: uploadOptions.folder, // The folder to upload the image to on Cloudinary
            public_id: uploadOptions.public_id, // The public ID of the image
            overwrite: uploadOptions.overwrite, // Whether to overwrite the image if it already exists
            invalidate: uploadOptions.invalidate, // Whether to invalidate the image if it already exists
            resource_type: uploadOptions.resource_type, // The type of resource to upload
            allowed_formats: uploadOptions.allowed_formats, // The allowed formats for the image
            format: uploadOptions.format, // The format of the image
            quality: uploadOptions.quality, // The quality of the image
            max_bytes: uploadOptions.max_bytes, // The maximum size of the image in bytes
            context: uploadOptions.context, // The context of the image (e.g., alt text)
            secure: true // Whether to use HTTPS for the image
        })

        //  Delete local file
        unlinkSync(localFilePath)

        // Return image url
        return response
    } catch (error) {
        unlinkSync(localFilePath)

        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Failed to upload image on cloudinary').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
}

/**
 * Deletes an image from Cloudinary.
 *
 * @param req - The Express request object.
 * @param next - The Express next function for error handling.
 * @param public_id - The public ID of the image to delete from Cloudinary.
 * @returns A promise that resolves to void if the image is successfully deleted or an error if the deletion fails.
 */
export const deleteFromCloudinary = async (req: Request, next: NextFunction, publicId: string) => {
    try {
        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Failed to delete image from cloudinary').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
}


export const cloundinaryUtil = {
    uploadOnCloudinary,
    deleteFromCloudinary
}