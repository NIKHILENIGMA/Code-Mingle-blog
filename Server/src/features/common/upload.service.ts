import { UploadApiResponse } from 'cloudinary'
import { CloundinaryOption, UploadOptions } from '@/types/common/base.types'
import { deleteFromCloudinary, uploadOnCloudinary } from '../../utils/Cloudinary'
import { ALLOWED_FORMATS, FORMAT, INVALIDATE, MAX_BYTES, OVERWRITE } from '@/config'
import { StandardError } from '@/utils/Errors/StandardError'
import { InternalServerError } from '@/utils/Errors'


class UploadService {
    constructor() {}

    async uploadFile(id: string, path: string, cloundinaryOption: CloundinaryOption): Promise<string | void> {
        // Generate Cloudinary options
        const options = this.cloundinaryOption(
            cloundinaryOption.folder,
            id,
            cloundinaryOption.public_name,
            cloundinaryOption.quality,
            cloundinaryOption.resource,
            cloundinaryOption.altName
        )

        // Upload image to Cloudinary
        try {
            const image = (await this.cloudinaryUploadService(options, path)) as UploadApiResponse

            return image.secure_url
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError('An error occurred while uploading the file')
        }
    }

    public async removeImage(public_id: string): Promise<void> {
        try {
            // Delete image from Cloudinary
            await this.cloudinaryDeleteService(public_id)
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError('An error occurred while removing the file from cloudinary')
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
    private async cloudinaryUploadService(options: UploadOptions, imagePath: string): Promise<UploadApiResponse | void> {
        try {
            return await uploadOnCloudinary(options, imagePath)
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError('An error occurred while uploading the image')
        }
    }

    private async cloudinaryDeleteService(public_id: string): Promise<void> {
        try {
            await deleteFromCloudinary(public_id)
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError('An error occurred while deleting file from the cloudinary cloud')
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
