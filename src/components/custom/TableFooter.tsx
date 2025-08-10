import type { FetchPaginationType } from "@interfaces/pageInterface";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

type Props = {
  footerData: FetchPaginationType;
};

const TableFooter = ({ footerData }: Props) => {
  return (
    <div className="!flex-row items-center justify-between px-md py-xs bg-neutral-50">
      <p className="text-body-xs font-normal text-neutral-500">
        Showing{" "}
        <span className="text-body-sm">
          {footerData.total === 0
            ? 0
            : footerData.total === 1
            ? 1
            : `${footerData.from} - ${footerData.to}`}
        </span>{" "}
        from <span className="text-body-sm">{footerData.total}</span>
      </p>

      <div className="!flex-row items-center gap-[8px]">
        <button
          type="button"
          className={`size-lg ${
            footerData.from === 1 || footerData.total === 0
              ? "bg-neutral-200 text-neutral-400"
              : "bg-neutral-0 hover:bg-primary-200 text-neutral-900 hover:text-primary-400 hover:border-primary-400"
          } transition-colors duration-300 border border-neutral-200 rounded-md items-center justify-center`}
        >
          <GrFormPrevious size={16} />
        </button>

        <button
          type="button"
          className={`size-lg ${
            footerData.to === footerData.total || footerData.total === 0
              ? "bg-neutral-200 text-neutral-400"
              : "bg-neutral-0 hover:bg-primary-200 text-neutral-900 hover:text-primary-400 hover:border-primary-400"
          }  transition-colors duration-300 border border-neutral-200 rounded-md items-center justify-center`}
        >
          <GrFormNext size={16} />
        </button>
      </div>
    </div>
  );
};

export default TableFooter;
