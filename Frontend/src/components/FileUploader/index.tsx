import { FC } from "react";
import { Button, Input } from "@/components";
import { Trash2 } from "@/Utils/Icons";
import { useFileUpload } from "@/hooks/useFileUpload";

interface FileUploaderProps {
  btnName: string;
  uploadFileName: string;
  uploadURL: string;
  cn?: string;
}

const FileUploader: FC<FileUploaderProps> = ({
  btnName,
  uploadFileName,
  uploadURL,
  cn = "",
}) => {
  const {
    file,
    fileStatus,
    filePreview,
    fileError,
    handleFileChange,
    handleFileUpload,
    handleFileToTrash,
  } = useFileUpload({ fileName: uploadFileName, url: uploadURL });

  return (
    <div className={`w-full h-full ${cn}`}>
      <div className="w-full h-full">
        {file ? (
          <div>
            <div className="relative w-full">
              {filePreview && (
                <img
                  src={filePreview}
                  alt="File Preview"
                  className="w-full h-full"
                />
              )}
              <div className="absolute top-4 right-2">
                <Trash2 onClick={handleFileToTrash} />
              </div>
            </div>
            <div className="space-y-3">
              <p>Selected File: {file.name}</p>
              <p>File Size: {file.size} bytes</p>
              <p>File Type: {file.type}</p>
            </div>
          </div>
        ) : (
          <p>Upload a file</p>
        )}
      </div>
      <Input type="file" onChange={handleFileChange} className="hidden" />

      {file && fileStatus !== "uploading" && (
        <Button onClick={handleFileUpload}>{btnName}</Button>
      )}

      {file && fileStatus === "success" && (
        <p>{file.name} is upload succesfully</p>
      )}

      {file && fileStatus === "error" && <p>{fileError}</p>}
    </div>
  );
};

export default FileUploader;
