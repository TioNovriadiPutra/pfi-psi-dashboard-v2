import type { SidebarType } from "@interfaces/pageInterface";
import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router";

type Props = {
  buttonData: SidebarType;
};

const SidebarButton = ({ buttonData }: Props) => {
  const Icon = buttonData.icon;

  const location = useLocation();
  const nav = useNavigate();

  return (
    <motion.button
      type="button"
      className={`!justify-start gap-[12px] !px-[12px] !py-[10px] bg-neutral-0 hover:bg-primary-200 ${
        location.pathname.includes(buttonData.dest)
          ? "text-primary-400"
          : "text-neutral-900"
      } hover:text-primary-400 transition-colors duration-300 rounded-lg`}
      onClick={() => nav(buttonData.dest)}
    >
      <Icon size={24} />

      <p className="text-body-sm font-medium ">{buttonData.label}</p>
    </motion.button>
  );
};

export default SidebarButton;
