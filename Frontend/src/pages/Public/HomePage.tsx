import { FC } from "react";
import ProductSection from "@/components/Home/ProductSection";
import HeroSection from "@/components/Home/HeroSection";
import BlogSection from "@/components/Home/BlogSection";
import TrackRecordSection from "@/components/Home/TrackRecordSection";

const HomePage: FC = () => {
  return (
    <>
      <HeroSection />
      <ProductSection />
      <BlogSection />
      <TrackRecordSection />
    </>
  );
};

export default HomePage;
