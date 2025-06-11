import { FC } from "react";
import { Button } from "../ui/button";
// import { Button } from "@/components";

const HeroSection: FC = () => {
  return (
    <section className="relative z-10 flex items-center justify-center h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-[linear-gradient(to_right,#2b2b2b_1px,transparent_1px),linear-gradient(to_bottom,#2b2b2b_1px,transparent_1px)]">
        {/* Right Gradient */}
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_300px_at_100%_200px,#d5c5ff,transparent)] sm:bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_600px_at_100%_200px,#4f388c,transparent)]"></div>

        {/* Left Gradient */}
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_300px_at_0%_600px,#d5c5ff,transparent)] sm:bg-[radial-gradient(circle_600px_at_0%_600px,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_600px_at_0%_600px,#4f388c,transparent)]"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-full h-20 bg-gradient-to-t from-background to-transparent "></div>

      <div className="relative z-20 flex flex-col items-center justify-start w-full h-full pt-32 space-y-2">
        <span className="hidden px-4 py-1 text-sm text-center rounded-full md:block text-white/80 bg-gradient-to-r from-primary to-primary/40">
          Easy to use, powerful, and flexible platform for your needs.
        </span>
        <div className="flex flex-col items-center justify-center p-3 space-y-3 text-4xl font-bold text-secondary-foreground">
          <h1 className="tracking-tight text-center sm:text-5xl md:text-6xl">
            Unleash Your Words:
          </h1>
          <h1 className="tracking-tight text-center sm:text-5xl md:text-6xl">
            A Place to Create & Express
          </h1>
        </div>
        <p className="max-w-2xl font-medium text-center text-md text-secondary-foreground/60 ">
          A dynamic space for every mind—developers, creators, marketers, and
          more—to express and inspire.
        </p>

        <div className="flex items-center justify-center mt-6 space-x-4">
          <Button variant="default" size="lg">
            Get Started for Free
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-secondary-foreground"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

{
  /* <div className="absolute inset-0 z-[-1] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-[linear-gradient(to_right,#2b2b2b_1px,transparent_1px),linear-gradient(to_bottom,#2b2b2b_1px,transparent_1px)]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_800px_at_100%_200px,#4f388c,transparent)]"></div>
      </div> */
}
