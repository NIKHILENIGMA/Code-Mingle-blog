import { FC } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

const Main: FC = () => {
  return (
    <div>
      <Header />
      <main className="">
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
