import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { cloudinaryConfig } from '@/config'
import { unlinkSync } from 'node:fs'
import { UploadOptions } from '@/types/common/base.types'
import { StandardError } from './Errors/StandardError'
import { InternalServerError } from './Errors'


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
export const uploadOnCloudinary = async (uploadOptions: UploadOptions, localFilePath: string): Promise<UploadApiResponse | void> => {
    try {
        if (!localFilePath) {
            throw new InternalServerError('File local-path does not provided. Can not upload file on cloudinary without local-path')
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

        if (error instanceof StandardError) {
            throw error
        }

        throw new InternalServerError('An error occurred while upload on cloudinary method')
    }
}

export const deleteFromCloudinary = async (publicId: string) => {
    try {
        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        if (error instanceof StandardError) {
            throw error
        }

        throw new InternalServerError('An error occurred deleting file method')
    }
}

export const cloundinaryUtil = {
    uploadOnCloudinary,
    deleteFromCloudinary
}
