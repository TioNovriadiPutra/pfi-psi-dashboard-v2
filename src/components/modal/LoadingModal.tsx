import ModalContainer from "@containers/ModalContainer";
import { useLoadingModal } from "@stores/modalStore";
import { Reuleaux } from "ldrs/react";
import "ldrs/react/Reuleaux.css";

const LoadingModal = () => {
  const loadingModal = useLoadingModal((state) => state.show);

  return (
    <ModalContainer show={loadingModal} withMin={false}>
      <div className="p-md">
        <Reuleaux
          size="36"
          stroke="5"
          strokeLength="0.15"
          bgOpacity="0.1"
          speed="1.2"
          color="#3399aa"
        />
      </div>
    </ModalContainer>
  );
};

export default LoadingModal;
