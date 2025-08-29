import type { AppRowType } from "@interfaces/pageInterface";

type Props = {
  headerData: AppRowType[];
};

const TableHeader = ({ headerData }: Props) => {
  return (
    <div className="w-max lg:w-auto !flex-row bg-neutral-100 lg:bg-neutral-0 rounded-lg lg:rounded-none">
      {headerData.map((item, index) => (
        <div
          key={index.toString()}
          className={`${item.flex} min-w-[200px] p-[16px] lg:border-b border-b-neutral-200`}
        >
          <p className="text-body-xs font-medium text-neutral-500">
            {item.label}
          </p>
        </div>
      ))}

      <div className="flex-1 min-w-[100px] lg:border-b border-b-neutral-200" />
    </div>
  );
};

export default TableHeader;
