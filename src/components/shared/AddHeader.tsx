import { GrFormPrevious } from "react-icons/gr";
import { useNavigate } from "react-router";
import Button from "./Button";
import { useLoadingButton } from "@stores/pageStore";

type Props = {
  title: string;
  onSubmit?: () => void;
};

const AddHeader = ({ title, onSubmit }: Props) => {
  const loadingButton = useLoadingButton((state) => state.show);

  const nav = useNavigate();

  return (
    <div className="!flex-row items-center justify-between">
      <div className="!flex-row items-center gap-[16px]">
        <button
          type="button"
          className="size-lg bg-neutral-0 hover:bg-primary-200 text-neutral-900 hover:text-primary-400 border border-neutral-200 hover:border-primary-400 transition-colors duration-300 items-center justify-center rounded-md"
          onClick={() => nav(-1)}
        >
          <GrFormPrevious size={16} />
        </button>

        <h2 className="text-neutral-900">{title}</h2>
      </div>

      <div className="!flex-row items-center gap-[8px]">
        <Button
          buttonData={{
            label: "Cancel",
            color: "bg-neutral-0",
            hover: "hover:bg-primary-200",
          }}
          onClick={() => nav(-1)}
        />

        <Button
          buttonData={{
            label: "Submit",
            color: "bg-primary-500",
            hover: "hover:bg-primary-600",
          }}
          type="submit"
          isLoading={loadingButton}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default AddHeader;
