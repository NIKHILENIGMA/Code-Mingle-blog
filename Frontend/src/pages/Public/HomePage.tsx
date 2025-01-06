// import { HeroBackground } from "@/components";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen py-12 ">
      <section className="relative w-full h-[60vh] p-4 text-textColor space-y-3">
        <div className="absolute bottom-auto -z-10 left-0 right-auto top-0 size-[300px] translate-x-[100%] translate-y-[8%] rounded-full bg-[rgba(216,29,119,0.39)] opacity-50 blur-[85px]" />
        <h1 className="text-[4.5rem] text-wrap text-center px-28 font-bold font-[Mona Sans] leading-[6rem]">
          Empowering Developers to Share Their{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-700">
            Journey
          </span>
        </h1>
        <p className="text-[1.3rem] text-wrap text-center px-44 font-medium text-textColor/60">
          A platform designed for developers to express ideas, share insights,
          and collaborate. Connect with a global community that values your
          expertise.
        </p>
      </section>

      {/* Feature Section */}
      {/* <section className="relative w-full h-[80vh] bg-cyan-400 p-4 text-black space-y-2">
        
      </section> */}
    </div>
  );
};

export default HomePage;
