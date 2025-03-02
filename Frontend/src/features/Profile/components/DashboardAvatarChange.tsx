import { FC, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  Input,
} from "@/components";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Pencil } from "@/Utils/Icons";
import {
  changeAvatar,
  deleteAvatar,
  uploadAvatar,
} from "@/services/api/userApiSevices";

interface DashboardAvatarChangeProps {
  avatar: string;
  alt: string;
}

const DashboardAvatarChange: FC<DashboardAvatarChangeProps> = ({
  avatar,
  alt,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("avatarImg", selectedFile);
    await uploadAvatar(formData);
  };

  const handleChangeAvatar = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("avatarImg", selectedFile);
    await changeAvatar(formData);
  };

  const handleDeleteAvatar = async () => {
    await deleteAvatar();
  };

  return (
    <div className="absolute bottom-0 right-6 w-10 h-10 flex justify-center items-center">
      <Dialog>
        <DialogTrigger>
          <Pencil />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Avatar</DialogTitle>
            <DialogDescription>
              {avatar ? (
                <div className="flex flex-col items-center space-y-4">
                  <img
                    src={avatar}
                    alt={alt}
                    className="w-20 h-20 rounded-full"
                  />
                  <div className="flex space-x-4">
                    <Button onClick={handleChangeAvatar}>Change</Button>
                    <Button onClick={handleDeleteAvatar}>Delete</Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-64 h-64 rounded-full overflow-hidden bg-red-600">
                      {preview ? (
                        <img
                          src={preview}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-500 flex justify-center items-center">
                          <Button onClick={() => inputRef.current?.click()}>
                            Upload
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  {preview && (
                    <div className="flex justify-center items-center space-x-4 mt-10">
                      <Button onClick={handleUpload}>Submit</Button>
                      <Button
                        onClick={() => {
                          setSelectedFile(null);
                          setPreview(null);
                        }}
                      >
                        cancel
                      </Button>
                    </div>
                  )}
                  <Input
                    type="file"
                    ref={inputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardAvatarChange;
