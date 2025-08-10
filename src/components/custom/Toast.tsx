import { useToast } from "@stores/pageStore";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

const Toast = () => {
  const toast = useToast();

  useEffect(() => {
    let timeout: number;

    if (toast.show) {
      timeout = setTimeout(() => {
        toast.hideToast();
      }, 4000);
    }

    return () => clearTimeout(timeout);
  }, [toast]);

  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          className="absolute z-[999] bottom-[32px] left-1/2 transform -translate-x-1/2 min-w-[360px] bg-neutral-0 border border-neutral-200 rounded-lg overflow-hidden"
          style={{ boxShadow: "0px 2px 15px -3px rgba(0, 0, 0, 0.1)" }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
        >
          <div className="!flex-row items-center px-sm pt-xs pb-[10px] gap-xs">
            <div
              className={`size-[40px] rounded-full ${
                toast.type === "success" ? "bg-green-200" : "bg-red-100"
              } items-center justify-center`}
            >
              <img
                src={toast.type === "success" ? "/success.svg" : "/failed.svg"}
                alt="Toast"
                className="size-sm"
              />
            </div>

            <p className="flex-1 text-body-xs font-semibold text-neutral-900">
              {toast.message}
            </p>

            <button
              type="button"
              className="size-md items-center justify-center bg-neutral-0 hover:bg-neutral-200 transition-colors duration-300 rounded-md"
            >
              <img src="/close.svg" alt="Close" className="size-sm" />
            </button>
          </div>

          <motion.div
            className={`h-[4px] ${
              toast.type === "success" ? "bg-green-300" : "bg-red-300"
            } rounded-full`}
            initial={{ width: "100%" }}
            animate={{ width: 0 }}
            transition={{ duration: 4, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
