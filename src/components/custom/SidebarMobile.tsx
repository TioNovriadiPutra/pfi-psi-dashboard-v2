import { useSidebar } from "@stores/pageStore";
import { AnimatePresence, motion } from "motion/react";

const SidebarMobile = () => {
  const sidebar = useSidebar();

  return (
    <AnimatePresence>
      {sidebar.show && (
        <motion.div
          className="absolute bg-neutral-0 top-0 bottom-0 w-[288px] border-r border-r-neutral-200"
          initial={{ x: "-289px" }}
          animate={{ x: 0 }}
          exit={{ x: "-289px" }}
        >
          <div className="!flex-row items-start px-md py-[16px] gap-[10px] border-b border-b-neutral-200">
            <img src="/logo.svg" alt="MaxzRange" className="size-md" />

            <h1 className="text-neutral-900">MaxZRange</h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SidebarMobile;
