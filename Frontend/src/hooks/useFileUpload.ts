import { ChangeEvent, useState } from "react";
import { apiInstance } from "@/services/api/apiInstance";

type FileStatus = "idle" | "uploading" | "success" | "error";

interface UseFileUploadProps {
  fileName: string;
  url: string;
}

const FILE_SIZE = 1024 * 1024 * 5; // 5MB maximum file size limit

export const useFileUpload = ({ fileName, url }: UseFileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileStatus, setFileStatus] = useState<FileStatus | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  // Handle file change event
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  // Handle file upload event
  const handleFileUpload = async () => {
    if (!file) return;

    // Check if the file type is allowed
    const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
    
    // If file type is invalid, throw error
    if (!allowedFileTypes.includes(file.type)) {
      setFileStatus("error");
      setFileError("File type must be JPEG, PNG, or JPG");
      return;
    }

    // Check file size
    if (file.size > FILE_SIZE) {
      setFileError("File size must be less than 5MB");
      setFileStatus("error");
      return;
    }

    // Set file status to uploading
    setFileStatus("uploading");

    // Create form data and append the file
    const formData = new FormData();
    formData.append(fileName, file);

    try {
      // Send the file using the provided API instance
      await apiInstance.post(url, formData);
      setFileStatus("success");
    } catch (error) {
      console.error(`File upload for ${url}, Potential Reason might be ${error}`);
      setFileStatus("error");
      setFileError("Failed to upload file");
    }
  };

  // Handle file removal event
  const handleFileToTrash = () => {
    setFile(null);
    setFilePreview(null);
    setFileStatus(null);
  };

  return {
    file,
    fileStatus,
    filePreview,
    fileError,
    handleFileChange,
    handleFileUpload,
    handleFileToTrash,
  };
};
