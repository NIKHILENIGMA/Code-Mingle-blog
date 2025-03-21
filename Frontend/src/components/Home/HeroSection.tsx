import { FC } from "react";
import { Button } from "@/components";

const HeroSection: FC = () => {
  return (
    <section className="pt-24 pb-16 ">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-primary uppercase mb-2 tracking-wider">
          Platform
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
          Empowering Developers to share their journey
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          A platform designed for developers to express ideas, share insights
          and collaborate. Connect with a global community that values your
          expertise.
        </p>

        <div className="relative mt-12">
          <div className="bg-white rounded-lg shadow-lg h-64 sm:h-80 md:h-[32rem] flex justify-center items-center">
            <video
              src="https://videocdn.cdnpk.net/videos/297d01d6-9e03-423f-9654-464091c1b41c/horizontal/previews/clear/large.mp4?token=exp=1742122010~hmac=c591ceca99974b2826d773aa5134605ea54ec692cdf7fe9258045f394f3f5a54"
              muted
              loop
              autoPlay
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <img
            src="./hero-sitting-boy.svg"
            alt="Illustration Left"
            className="absolute -bottom-4 -left-4 w-24 sm:w-28 md:w-32 lg:w-40 transition-all duration-300 ease-in-out"
          />
          <img
            src="./hero-standing-girl.svg"
            alt="Illustration Right"
            className="absolute -bottom-4 -right-4 md:-right-5 lg:-right-7 w-24 sm:w-28 md:w-32 lg:w-40 transition-all duration-300 ease-in-out"
          />
        </div>

        <Button className="mt-20">Get Started</Button>
      </div>
    </section>
  );
};

export default HeroSection;
