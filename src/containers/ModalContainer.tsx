import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  show: boolean;
  withMin?: boolean;
  minWidth?: string;
};

const ModalContainer = ({
  children,
  show,
  withMin = true,
  minWidth = "min-w-[380px]",
}: Props) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="absolute z-[999] bg-modal top-0 right-0 bottom-0 left-0 items-center justify-center">
          <motion.div
            className={`max-h-[calc(100dvh-64px)] ${
              withMin && minWidth
            } bg-neutral-0 rounded-lg`}
            style={{ boxShadow: "2px 2px 14px 0px rgba(0, 0, 0, 0.15)" }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalContainer;
