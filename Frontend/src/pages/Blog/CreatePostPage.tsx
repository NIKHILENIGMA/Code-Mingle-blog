import React from "react";
import { PanelLeft, PanelRight } from "lucide-react";
import SideBar from "@/features/Blog/components/SideBar";
import DraftForm from "@/features/Blog/components/DraftForm";
import { Button } from "@/components";
import DraftActions from "@/features/Blog/components/DraftActions";

const CreatePostPage: React.FC = () => {
  const [showSidebar, setShowSidebar] = React.useState<boolean>(true);

  return (
    <div>
      <Button
        variant="link"
        onClick={() => setShowSidebar(!showSidebar)}
        className={`fixed z-30 px-4 py-2 top-4 ${
          showSidebar ? "left-32" : "left-4"
        } transition-all duration-500 ease-in-out`}
      >
        {showSidebar ? <PanelRight size={18} /> : <PanelLeft size={18} />}
      </Button>
      <SideBar sideBar={showSidebar} />
      <div className="w-full h-full space-y-10 lg:space-y-12">
        <DraftActions />
        <DraftForm />
      </div>
    </div>
  );
};

export default CreatePostPage;
