import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Main: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="mt-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
