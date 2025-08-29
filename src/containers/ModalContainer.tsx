import useResponsive from "@hooks/useResponsive";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  show: boolean;
  withMin?: boolean;
  minWidth?: string;
  onClose?: () => void;
};

const ModalContainer = ({
  children,
  show,
  withMin = true,
  minWidth = "min-w-[380px]",
  onClose,
}: Props) => {
  const { isTablet } = useResponsive();

  return (
    <AnimatePresence>
      {show && (
        <div className="absolute z-[999] bg-modal top-0 right-0 bottom-0 left-0 lg:items-center justify-end lg:justify-center">
          {isTablet && (
            <button type="button" className="flex-1" onClick={onClose} />
          )}

          <motion.div
            className={`max-h-[calc(100dvh-64px)] ${
              withMin && minWidth
            } bg-neutral-0 rounded-tl-lg rounded-tr-lg lg:rounded-lg pt-[6px] lg:pt-0`}
            style={{ boxShadow: "2px 2px 14px 0px rgba(0, 0, 0, 0.15)" }}
            initial={isTablet ? { y: "100%" } : { opacity: 0, scale: 0.5 }}
            animate={isTablet ? { y: 0 } : { opacity: 1, scale: 1 }}
            exit={isTablet ? { y: "100%" } : { opacity: 0, scale: 0.5 }}
            transition={{ ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalContainer;
