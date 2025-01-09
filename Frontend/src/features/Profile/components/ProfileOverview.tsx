import React from "react";
import { Heart, MessageCircle } from "@/Utils/Icons";
import { profileCardData } from "@/constants/dummyData";


const ProfileOverview: React.FC = () => {
  return (
    <div className="relative flex w-full min-h-screen gap-2 overflow-x-hidden ">
      <div className="w-full h-full mx-auto max-w-7xl">
        {/* Post Cards Section */}
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          {profileCardData.map((card, index) => (
            <div
              key={index + card.cardId}
              className="overflow-hidden bg-white rounded-lg shadow-md"
            >
              <div className="relative h-40 bg-gray-300">
                <img
                  src={card.blogCoverImage}
                  alt={card.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-900">
                  {card.title.toString().substring(0, 80)} ...
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  {card.description.toString().substring(0, 100)} ...
                </p>
                <div className="flex items-center justify-between mt-4 text-gray-500">
                  <span className="text-sm">{card.time}</span>
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                      <Heart /> {card.likes} 
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle /> 12
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
