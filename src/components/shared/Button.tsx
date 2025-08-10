import type { ButtonType } from "@interfaces/formInterface";
import { Reuleaux } from "ldrs/react";
import "ldrs/react/Reuleaux.css";
import type { IconType } from "react-icons/lib";

type Props = {
  buttonData: ButtonType;
  type?: "button" | "submit";
  isLoading?: boolean;
  size?: "sm" | "md";
  icon?: IconType;
  onClick?: () => void;
};

const Button = ({
  buttonData,
  type = "button",
  isLoading,
  size = "md",
  icon,
  onClick,
}: Props) => {
  const Icon = icon;

  return (
    <button
      type={type}
      className={`${buttonData.color} ${buttonData.hover} ${
        buttonData.color === "bg-neutral-0" &&
        "border border-neutral-200 hover:border-primary-500"
      } ${
        buttonData.color === "bg-neutral-0"
          ? "text-neutral-900 hover:text-primary-400"
          : "text-neutral-0"
      } transition-colors duration-300 ${
        size === "sm" ? "px-[12px] py-[7px]" : "p-[11.5px]"
      } rounded-md gap-[8px]`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Reuleaux
          size="14"
          stroke="2"
          strokeLength="0.15"
          bgOpacity="0.1"
          speed="1.2"
          color="#ffffff"
        />
      ) : (
        <>
          {Icon && <Icon size={18} />}

          <p className={`text-body-sm font-medium`}>{buttonData.label}</p>
        </>
      )}
    </button>
  );
};

export default Button;
