import type { AppRowFuncType } from "@interfaces/pageInterface";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

type Props = {
  funcData: AppRowFuncType;
};

const TableRowFunc = ({ funcData }: Props) => {
  const Icon = funcData.icon;

  return (
    <button
      type="button"
      className="bg-neutral-0 hover:bg-primary-200 transition-colors duration-300 px-xs py-[8px] !justify-start rounded-md gap-[8px]"
      onClick={funcData.onClick}
    >
      {funcData.type === "detail" ? (
        <AiOutlineExclamationCircle size={16} />
      ) : funcData.type === "edit" ? (
        <MdOutlineEdit size={16} />
      ) : funcData.type === "custom" && Icon ? (
        <Icon size={16} />
      ) : (
        <MdDeleteOutline size={16} />
      )}

      <p className="text-body-sm font-normal text-neutral-900 text-left">
        {funcData.type === "edit"
          ? "Edit"
          : funcData.type === "detail"
          ? "Detail"
          : funcData.type === "delete"
          ? "Delete"
          : funcData.label}
      </p>
    </button>
  );
};

export default TableRowFunc;
