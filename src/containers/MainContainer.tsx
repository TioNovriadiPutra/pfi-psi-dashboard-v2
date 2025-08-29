import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  type?: "default" | "add";
};

const MainContainer = ({ children, type = "default" }: Props) => {
  return (
    <div
      className={`flex-1 pt-xs px-[16px] ${
        type === "default" && "pb-lg"
      } lg:p-md gap-xs overflow-hidden`}
    >
      {children}
    </div>
  );
};

export default MainContainer;
