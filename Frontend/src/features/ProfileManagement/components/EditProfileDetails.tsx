import { Button, Input, Label } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useForm } from "react-hook-form";

const EditProfileDetails: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "Pedro Duarte",
      username: "@peduarte",
      email: "test@test.com",
      phone: "0000000000",
      bio: "Frontend Developer",
    },
  });

  type FormValues = {
    name: string;
    username: string;
    email: string;
    phone: string;
    bio: string;
  };

  const onsubmit = (data: FormValues) => {
    console.log(data);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form onSubmit={handleSubmit(onsubmit)} className="space-y-3">
            {/* Name */}
            <div className="grid items-center grid-cols-4 gap-2">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className={`col-span-3 ${
                  errors.name ? "border-red-400" : "border-slate-600"
                }`}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-xs  font-normal text-red-400 w-[20vw] text-center pl-10">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div className="grid items-center grid-cols-4 gap-2">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                className={`col-span-3 ${
                  errors.username ? "border-red-400" : "border-slate-600"
                }`}
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-xs font-normal text-red-400 w-[20vw] text-center pl-16">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="grid items-center grid-cols-4 gap-2">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                className={`col-span-3 ${
                  errors.email ? "border-red-400" : "border-slate-600"
                }`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-xs font-normal text-red-400 w-[20vw] text-center pl-10">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone number */}
            <div className="grid items-center grid-cols-4 gap-2">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                className={`col-span-3 ${
                  errors.phone ? "border-red-400" : "border-slate-600"
                }`}
                {...register("phone", { required: "Phone is required" })}
              />
              {errors.phone && (
                <p className="text-xs font-normal text-red-400 w-[20vw] text-center pl-10">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="grid items-center grid-cols-4 gap-2">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Textarea
                id="bio"
                className={`col-span-3 ${
                  errors.bio ? "border-red-400" : "border-slate-600"
                }`}
                {...register("bio", { required: "Bio is required" })}
              />
              {errors.bio && (
                <p className="text-xs font-normal text-red-400 w-[20vw] text-center pl-10">
                  {errors.bio.message}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "...Loading" : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDetails;
