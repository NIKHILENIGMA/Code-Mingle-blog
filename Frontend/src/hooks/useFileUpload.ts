import { useState, useRef, ChangeEvent, RefObject, MouseEvent } from "react";
import { fileValidations } from "@/Utils/fileValidations";
import { toast } from "sonner";

interface UseFileUploadProps {
  fileName: string; // Key name for the file in the FormData object
  onUploadService: (
    id: string,
    formData: FormData
  ) => Promise<Record<string, string>>; // Service function to handle file upload
  onUploadSuccess?: (response: Record<string, string>) => void; // Optional callback for successful upload
  onRemoveService?: (id: string) => Promise<void>; // Optional service function to handle file removal
  onRemoveSuccess?: () => void; // Optional callback for successful removal
}

/**
 * Custom hook for handling file uploads.
 * @param {string} fileName - The name of the file input field in the FormData object.
 * @param {function} onUploadService - The service function to handle the file upload.
 * @param {function} [onSuccess] - Optional callback function to be called on successful upload.
 * @returns {object} - An object containing the file input reference, loading state, and file change handler.
 *
 */

// Refactored useFileUpload hook for better readability and maintainability
export const useFileUpload = ({
  fileName,
  onUploadService,
  onUploadSuccess,
  onRemoveService,
  onRemoveSuccess,
}: UseFileUploadProps) => {
  const [loading, setLoading] = useState<boolean>(false); // Tracks the upload process state
  const selectFileRef = useRef<HTMLInputElement>(null); // Reference to the file input element

  // Validates the selected file
  const validateFile = (file: File | null): boolean => {
    if (!file) {
      toast.error("No file selected. Please select a file."); // Notify user of missing file
      return false; // Validation failed
    }

    const isValidFile = fileValidations(file); // Validate the file using utility function
    if (typeof isValidFile === "object" && isValidFile.error) {
      toast.error(isValidFile?.message); // Notify user of validation failure
      return false;
    }
    return true;
  };

  // Prepares FormData object for file upload
  const prepareFormData = (file: File): FormData => {
    const formData = new FormData();
    formData.append(fileName, file);
    return formData;
  };

  // Resets the file input field
  const resetFileInput = (): void => {
    if (selectFileRef.current) {
      selectFileRef.current.value = ""; // Reset the file input for future uploads
    }
  };

  // Handles the file upload process
  const handleUpload = async (
    id: string,
    formData: FormData
  ): Promise<void> => {
    try {
      setLoading(true); // Indicate upload is in progress
      const response: Record<string, string> = await onUploadService(
        id,
        formData
      ); // Call the upload service
      if (onUploadSuccess) onUploadSuccess(response); // Trigger optional onUploadSuccess callback
    } catch (error) {
      console.error("Error uploading file:", error); // Log error for debugging
      toast.error("Error uploading file. Please try again."); // Notify user of failure
    } finally {
      resetFileInput(); // Reset file input after upload
      setLoading(false); // Reset loading state
    }
  };

  // Handles file selection and validation
  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const file: File | null = event.target?.files?.[0] ?? null; // Extract the selected file

    if (!validateFile(file)) {
      resetFileInput(); // Reset file input if validation fails
      return;
    }
    // Prepare FormData for upload
    const formData = prepareFormData(file!);
    // Perform the upload process
    await handleUpload(id, formData); 
  };

  // Handles file removal process
  const handleFileRemove = async (
    e: MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.stopPropagation(); // Prevent event bubbling

    try {
      if (onRemoveService) {
        await onRemoveService(id); // Call the remove service
      }

      if (onRemoveSuccess) onRemoveSuccess(); // Trigger optional onRemoveSuccess callback
    } catch (error) {
      toast.error("Error removing file. Please try again."); // Notify user of failure
      console.error({
        type: "File_UPLOAD_ERROR",
        message: "Error removing file",
        error: error, // Log the error for debugging
      });
    }
  };

  return {
    selectFile: selectFileRef as RefObject<HTMLInputElement>, // Expose file input reference
    loading, // Expose loading state
    handleFileChange, // Expose file change handler
    handleFileRemove, // Expose file remove handler
  };
};
