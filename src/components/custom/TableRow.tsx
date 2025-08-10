import type { AppRowFuncType, AppRowType } from "@interfaces/pageInterface";
import { AnimatePresence, motion } from "motion/react";
import { CiCircleCheck, CiClock2 } from "react-icons/ci";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import TableRowFunc from "./TableRowFunc";

type Props = {
  rowData: AppRowType[];
  funcData: AppRowFuncType[];
  isMenuActive: boolean;
  onOpen: () => void;
};

const TableRow = ({ rowData, funcData, isMenuActive, onOpen }: Props) => {
  return (
    <div className="!flex-row">
      {rowData.map((row, index2) => (
        <div
          key={index2.toString()}
          className={`${row.flex} !flex-row items-center min-w-[200px] px-[16px] py-[19.5px] border-b border-b-neutral-200 gap-[8px]`}
        >
          {row.type === "pending" ? (
            <CiClock2 size={18} className="text-neutral-900" />
          ) : row.type === "rejected" ? (
            <IoIosCloseCircleOutline size={18} className="text-neutral-900" />
          ) : row.type === "accepted" ? (
            <CiCircleCheck size={18} className="text-neutral-900" />
          ) : null}

          <p className="text-body-sm font-normal text-neutral-900">
            {row.label}
          </p>
        </div>
      ))}

      <div className="flex-1 min-w-[100px] border-b border-b-neutral-200 items-center justify-center">
        <button
          type="button"
          className="relative size-lg rounded-lg bg-neutral-0 hover:bg-primary-200 transition-colors duration-300"
          onClick={onOpen}
        >
          <HiDotsHorizontal size={16} className="z-10" />

          <AnimatePresence>
            {isMenuActive && (
              <motion.div
                className="absolute z-[999] min-w-[200px] bg-neutral-0 border border-neutral-200 rounded-md p-[5px] top-[110%] right-0 origin-top-right"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                {funcData.map((func, index) => (
                  <TableRowFunc key={index.toString()} funcData={func} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
};

export default TableRow;
