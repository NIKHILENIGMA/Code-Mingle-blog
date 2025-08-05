const VALIDFILETYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/svg+xml',
    'image/webp',
]

const VALIDFILEEXTENSIONS = ['.jpg', '.jpeg', '.png', '.svg', '.webp']

/**
 * Checks if the file type is valid and if the file size is less than 5MB.
 * @param file - The file to check
 * @returns { error: boolean; message?: string } | boolean - Returns true if the file type is valid and the file size is less than 5MB, otherwise returns an object with error and message properties.
 * 
 * @example 
 * const file = new File([""], "image.jpg", { type: "image/jpeg" });
 * const result = fileValidations(file);
 * console.log(result); // true or { error: true, message: "File type is not valid. Please upload an image." } 
 */
export const fileValidations = (file: File): { error: boolean; message?: string } | boolean  => {

    if (!file) {
        return {
            error: true,
            message: 'No file selected. Please select a file.',
        }
    }

    // Check if the file type is valid
    if (!file.type.startsWith('image/')) {
        return {
            error: true,
            message: 'File type is not valid. Please upload an image.',
        }
    }
    // Check if the file type is in the list of valid file types
    const validType = VALIDFILETYPES.includes(file.type)

    if (!validType) {
        return {
            error: true,
            message: 'File type is not valid. Please upload a valid image type.',
        }
    }

    // Check if the file extension is in the list of valid file extensions
    const validExtension =  VALIDFILEEXTENSIONS.some((extension) => file.name.endsWith(extension))

    if (!validExtension) {
        return {
            error: true,
            message: 'File extension is not valid. Please upload a valid image type like .jpg, .jpeg, .png, .svg, or .webp.',
        }
    }

    // Check if the file size is less than 5MB
    if (file.size > 5 * 1024 * 1024) {
        return {
            error: true,
            message: 'File size is too large. Please upload a file smaller than 5MB.',
        }
    }


    return true 
}




