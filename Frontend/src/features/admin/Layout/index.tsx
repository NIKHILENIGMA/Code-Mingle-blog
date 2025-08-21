import { FC } from "react";
import { Outlet } from "react-router";
import AdminSidebar from "../components/AdminSidebar";
import { Toaster } from "@/components/ui/sonner";

const AdminPanelLayout: FC = () => {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <AdminSidebar />
      <div className="flex-1 p-5">
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
};

export default AdminPanelLayout;
