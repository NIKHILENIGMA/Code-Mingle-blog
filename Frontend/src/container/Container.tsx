import { FC, ReactNode } from "react";

const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-full px-4 py-1 md:py-5 md:px-20 bg-background">
      {children}
    </div>
  );
};

export default Container;
