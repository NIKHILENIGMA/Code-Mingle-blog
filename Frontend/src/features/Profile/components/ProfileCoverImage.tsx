import React from "react";
import { Button, Img } from "@/components";

const ProfileCoverImage: React.FC = () => {
  const [isRepositioning, setIsRepositioning] = React.useState<boolean>(false);
  const [objectPositionY, setObjectPositionY] = React.useState<number>(50); // 50% by default
  const [dragStartY, setDragStartY] = React.useState<number | null>(null);

  const handleReposition = () => {
    setIsRepositioning((prev) => !prev);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isRepositioning) {
      setDragStartY(e.clientY);
      console.log("dragStartY", dragStartY);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isRepositioning && dragStartY !== null) {
      const delta = dragStartY - e.clientY;
      console.log("delta", delta);

      const newObjectPositionY = objectPositionY + delta / 2; // Adjust sensitivity by scaling delta
      setObjectPositionY(Math.max(0, Math.min(100, newObjectPositionY))); // Clamp between 0% and 100%
      setDragStartY(e.clientY);
    }
  };

  const handleMoveUp = () => {
    if (isRepositioning) {
      setDragStartY(null);
    }
  };

  return (
    <div className="w-full h-[20vw]">
      <div
        className="relative w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMoveUp}
        onMouseLeave={handleMoveUp}
        onMouseDown={handleMouseDown}
      >
        <Img
          src="https://images.unsplash.com/photo-1498477386155-805b90bf61f7?q=80&w=1908&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="cover-image"
          draggable={true}
          cn={`object-cover w-full h-full ${
            isRepositioning ? "cursor-grab" : "cursor-pointer"
          } object-[20%_${objectPositionY}%] transition-all duration-300 ease-in;`}
        />
      </div>

      {isRepositioning ? (
        <div className="absolute bottom-2 left-[80%] w-full space-x-5 cursor-grab">
          <Button variant={"ghost"}>Save</Button>
          <Button variant={"ghost"} onClick={handleReposition}>
            Cancel
          </Button>
        </div>
      ) : (
        <div className="absolute bottom-2 left-[80%] w-full space-x-5">
          <Button variant={"ghost"}>Change</Button>
          <Button variant={"ghost"} onClick={handleReposition}>
            Reposition
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileCoverImage;
