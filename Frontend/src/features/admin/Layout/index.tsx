import { FC } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const AdminPanelLayout: FC = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanelLayout;
