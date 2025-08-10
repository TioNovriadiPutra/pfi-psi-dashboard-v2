import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthContainer = ({ children }: Props) => {
  return (
    <div className="flex-1 bg-neutral-0 items-center justify-center overflow-hidden">
      {children}
    </div>
  );
};

export default AuthContainer;
