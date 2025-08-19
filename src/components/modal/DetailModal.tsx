import {
  AccordionField,
  DetailField,
  DetailMapField,
} from "@components/shared";
import ModalContainer from "@containers/ModalContainer";
import type { MapType } from "@interfaces/formInterface";
import type { DetailAccordionStateType } from "@interfaces/stateInterface";
import { useDetailModal } from "@stores/modalStore";
import { IoMdClose } from "react-icons/io";

const DetailModal = () => {
  const detailModal = useDetailModal();

  return (
    <ModalContainer show={detailModal.show} minWidth="min-w-[776px]">
      <div className="!flex-row items-center justify-between px-md py-[16px] border-b border-b-neutral-200">
        <p className="text-body-md font-semibold text-neutral-900">
          {detailModal.title}
        </p>

        <button
          type="button"
          className="size-md items-center justify-center rounded-md bg-neutral-0 hover:bg-primary-200 text-neutral-400 hover:text-primary-400 transition-colors duration-300"
          onClick={() => detailModal.hideModal()}
        >
          <IoMdClose size={18} />
        </button>
      </div>

      <div className="flex-1 py-sm px-xl overflow-y-auto gap-sm">
        {detailModal.data.map((item, index) => {
          if (item.type === "map")
            return (
              <DetailMapField
                key={index.toString()}
                label={item.label}
                value={item.value as MapType}
              />
            );

          if (item.type === "accordion")
            return (
              <AccordionField
                key={index.toString()}
                label={item.label}
                value={item.value as DetailAccordionStateType[]}
              />
            );

          return (
            <DetailField
              key={index.toString()}
              label={item.label}
              value={item.value as string}
            />
          );
        })}
      </div>
    </ModalContainer>
  );
};

export default DetailModal;
