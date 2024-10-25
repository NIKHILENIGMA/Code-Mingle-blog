import React from "react";
import EditProfilePic from "@/features/ProfileManagement/components/EditProfilePic";
import Card from "@/components/Card";
import CoverImage from "@/features/ProfileManagement/components/CoverImage";
// import { Button } from "@/components";
import EditProfileDetails from "@/features/ProfileManagement/components/EditProfileDetails";

// import { DialogTrigger } from "@/components/ui/dialog";

// const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit.`


const ProfilePage: React.FC = () => {
  // const {src, } = useProfileManagement()

  return (
    <div className="w-full min-h-screen p-2">
      {/* cover-image */}
      <div className="relative w-full h-[20vw] cover-image">
        <CoverImage />
      </div>
      {/* profile */}
      <div className="flex items-center justify-start w-full p-3 bg-red-300 h-1/4">
        <div className="flex avatar">
          <EditProfilePic />
        </div>
        <div className="profile-info">
          <p className="text-2xl font-bold">Name</p>
          <p className="text-lg">Frontend Developer</p>
        </div>
        {/* profile-info */}
        <div className="w-full h-1/2">
          <p className="text-2xl font-bold">Profile Info</p>
          <p className="text-lg">Email: user@test.com</p>
          <p className="text-lg">Phone: 0000000000</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit qui,
            cupiditate corporis culpa fuga, velit, quaerat tenetur placeat et
            nostrum adipisci suscipit excepturi consequuntur nulla doloremque
            fugit praesentium. Magnam, dolor!</p>
          {/* profile-info */}
          <div className="w-full h-1/4">
            <p>Followers:110 </p> <p>Following: 5k</p>
          </div>
          <div className="">
            <EditProfileDetails />
          </div>
        </div>
      </div>
      <div className="w-full h-1/2 ">
        <h2>List of Posts</h2>
        <div className="grid grid-cols-3 gap-2 p-2">
          <div className="col-span-1">
            <Card
              img="https://images.unsplash.com/photo-1720139290958-d8676702c3ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG9tZSUyMGhhbGx8ZW58MHx8MHx8fDA%3D"
              alt="blog-1"
              cn="rounded-md"
              title="Blog Title 1"
              description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore,
      repellat atque eligendi..."
            />
          </div>
          <div className="col-span-1">
            <Card
              img="https://images.unsplash.com/photo-1720139290958-d8676702c3ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG9tZSUyMGhhbGx8ZW58MHx8MHx8fDA%3D"
              alt="blog-1"
              cn="rounded-md"
              title="Blog Title 1"
              description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore,
      repellat atque eligendi..."
            />
          </div>
          <div className="col-span-1">
            <Card
              img="https://images.unsplash.com/photo-1720139290958-d8676702c3ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG9tZSUyMGhhbGx8ZW58MHx8MHx8fDA%3D"
              alt="blog-1"
              cn="rounded-md"
              title="Blog Title 1"
              description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore,
      repellat atque eligendi..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
