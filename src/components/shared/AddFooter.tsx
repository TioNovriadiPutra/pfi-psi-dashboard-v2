import { useNavigate } from "react-router";
import Button from "./Button";
import { useLoadingButton } from "@stores/pageStore";

type Props = {
  onSubmit?: () => void;
  onPreview?: () => void;
};

const AddFooter = ({ onSubmit, onPreview }: Props) => {
  const loadingButton = useLoadingButton((state) => state.show);

  const nav = useNavigate();

  return (
    <div
      className="!flex-row px-xs pt-xs pb-md bg-neutral-0 mx-[-16px] border-t border-t-neutral-200 gap-[8px]"
      style={{ boxShadow: "2px 2px 14px 0px rgba(0, 0, 0, 0.15)" }}
    >
      <div className="flex-1">
        <Button
          buttonData={{
            label: onPreview ? "Preview" : "Cancel",
            color: "bg-neutral-0",
            hover: "hover:bg-primary-200",
          }}
          onClick={() => {
            if (onPreview) {
              onPreview();
            } else {
              nav(-1);
            }
          }}
        />
      </div>

      <div className="flex-1">
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

export default AddFooter;
