import { Button } from "@components/shared";
import ModalContainer from "@containers/ModalContainer";
import { useConfirmationModal } from "@stores/modalStore";
import { useLoadingButton } from "@stores/pageStore";
import { IoMdClose } from "react-icons/io";

const ConfirmationModal = () => {
  const confirmationModal = useConfirmationModal();
  const loadingButton = useLoadingButton((state) => state.show);

  return (
    <ModalContainer show={confirmationModal.show}>
      <div className="!flex-row items-center justify-between px-md py-[16px] border-b border-b-neutral-200">
        <p className="text-body-md font-semibold text-neutral-900">
          {confirmationModal.title}
        </p>

        <button
          type="button"
          className="size-md items-center justify-center rounded-md bg-neutral-0 hover:bg-primary-200 text-neutral-400 hover:text-primary-400 transition-colors duration-300"
          onClick={() => confirmationModal.hideModal()}
        >
          <IoMdClose size={18} />
        </button>
      </div>

      <div className="px-md py-sm">
        <p className="text-body-sm font-normal text-neutral-500">
          {confirmationModal.description.split("|").length > 1 ? (
            <>
              <span>{confirmationModal.description.split("|")[0]}</span>
              <span className="font-bold">
                {confirmationModal.description.split("|")[1]}
              </span>
              <span>{confirmationModal.description.split("|")[2]}</span>
            </>
          ) : (
            confirmationModal.description
          )}
        </p>
      </div>

      <div className="!flex-row items-center justify-end gap-xs px-md py-xs">
        <Button
          buttonData={{
            label: "Cancel",
            color: "bg-neutral-0",
            hover: "hover:bg-primary-200",
          }}
          onClick={confirmationModal.hideModal}
        />

        <Button
          buttonData={{
            label: "Confirm",
            color: "bg-primary-500",
            hover: "hover:bg-primary-600",
          }}
          onClick={confirmationModal.onConfirm!}
          isLoading={loadingButton}
        />
      </div>
    </ModalContainer>
  );
};

export default ConfirmationModal;
