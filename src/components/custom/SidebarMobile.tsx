import { useSidebar } from "@stores/pageStore";
import { sidebarData } from "@utils/constant/pageConst";
import { AnimatePresence, motion } from "motion/react";
import SidebarButton from "./SidebarButton";

const SidebarMobile = () => {
  const sidebar = useSidebar();

  return (
    <AnimatePresence>
      {sidebar.show && (
        <div className="absolute !flex-row w-dvw h-dvh bg-modal z-[999]">
          <motion.div
            className="bg-neutral-0 h-full w-[288px] border-r border-r-neutral-200"
            initial={{ x: "-289px" }}
            animate={{ x: 0 }}
            exit={{ x: "-289px" }}
            transition={{ ease: "easeOut" }}
          >
            <div className="!flex-row items-start px-md py-[16px] gap-[10px] border-b border-b-neutral-200">
              <img src="/logo.svg" alt="MaxzRange" className="size-md" />

              <h1 className="text-neutral-900">MaxZRange</h1>
            </div>

            <div className="flex-1 px-xs lg:px-sm py-[8px] gap-[16px]">
              {sidebarData.map((item, index) => (
                <div
                  key={index.toString()}
                  className={`${
                    index < sidebarData.length - 1 &&
                    "border-b border-b-neutral-200 border-dashed pb-[16px]"
                  }`}
                >
                  {item.map((item2, index2) => (
                    <SidebarButton key={index2.toString()} buttonData={item2} />
                  ))}
                </div>
              ))}
            </div>
          </motion.div>

          <button
            type="button"
            className="flex-1"
            onClick={sidebar.hideLoading}
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default SidebarMobile;
