import { FC } from "react";
// import { Button } from "@/components";

const HeroSection: FC = () => {
  return (
    <section className="relative z-10 flex items-center justify-center h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]  bg-[size:6rem_4rem] dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] dark:bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_800px_at_100%_200px,#190354aa,transparent)]"></div>
        <div className="flex items-center justify-center w-full h-full bg-red-50">
            <h1>
              Something amazing is coming soon!
            </h1>
        </div>
        <div className="absolute bottom-0 right-0 w-full h-20 bg-gradient-to-t from-background to-transparent "></div>
      </div>
    </section>
  );
};

export default HeroSection;
