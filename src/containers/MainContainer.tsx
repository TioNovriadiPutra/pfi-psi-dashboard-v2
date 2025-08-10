import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MainContainer = ({ children }: Props) => {
  return <div className="flex-1 p-md gap-xs overflow-hidden">{children}</div>;
};

export default MainContainer;
