type Props = {
  label: string;
  value: string;
  isArea?: boolean;
};

const DetailField = ({ label, value, isArea = false }: Props) => {
  return (
    <div className="w-full gap-[8px]">
      <p className="text-body-sm font-medium text-neutral-900">{label}</p>

      <div
        className={`!flex-row px-[12px] py-[8px] border border-neutral-200 rounded-md ${
          isArea && "h-[150px] overflow-y-auto"
        }`}
      >
        <p className="flex-1 text-body-sm font-normal text-neutral-900">
          {value}
        </p>
      </div>
    </div>
  );
};

export default DetailField;
