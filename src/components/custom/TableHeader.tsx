import type { AppRowType } from "@interfaces/pageInterface";

type Props = {
  headerData: AppRowType[];
};

const TableHeader = ({ headerData }: Props) => {
  return (
    <div className="!flex-row ">
      {headerData.map((item, index) => (
        <div
          key={index.toString()}
          className={`${item.flex} min-w-[200px] p-[16px] border-b border-b-neutral-200`}
        >
          <p className="text-body-xs font-medium text-neutral-500">
            {item.label}
          </p>
        </div>
      ))}

      <div className="flex-1 min-w-[100px] border-b border-b-neutral-200" />
    </div>
  );
};

export default TableHeader;
