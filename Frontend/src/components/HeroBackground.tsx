import React from "react";

interface HeroBackgroundProps {
  children: React.ReactNode;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ children }) => {
  return (
    <div className="w-full h-full">
      <div className="fixed left-0 w-full h-full overflow-hidden top-16 -z-10">
        
        <div className="absolute bottom-auto left-auto right-0 top-0 size-[500px] translate-x-[-90%] translate-y-[10%] rounded-full bg-[rgba(74,125,208,0.5)] opacity-50 blur-[80px]" />
        <div className="absolute bottom-auto left-auto right-0 top-0 size-[500px] translate-x-[-90%] translate-y-[10%] rounded-full bg-[rgba(237,216,124,0.9)] opacity-50 blur-[80px]" />
        {children}
      </div>
    </div>
  );
};

export default HeroBackground;
