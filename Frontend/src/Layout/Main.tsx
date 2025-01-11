import { FC } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
