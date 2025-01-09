import { FC } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Main: FC = () => {
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
