import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, Button, Img } from "@/components";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const EditProfilePic: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Avatar className="w-24 h-24">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="object-cover"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <div className="space-y-2">
              <Img
                src={"https://github.com/shadcn.png"}
                alt="profile-img"
                cn="object-cover"
              />
              <Button>Edit Profile</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfilePic;
