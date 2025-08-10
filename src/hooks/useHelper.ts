import type { ResType } from "@interfaces/resInterface";
import { useAuth } from "@stores/authStore";
import { useLoadingModal } from "@stores/modalStore";
import { useLoadingButton, useToast } from "@stores/pageStore";
import { useNavigate } from "react-router";

const useHelper = () => {
  const loadingButton = useLoadingButton();
  const loadingModal = useLoadingModal();
  const auth = useAuth();

  const showToast = useToast((state) => state.showToast);

  const nav = useNavigate();

  const onMutate = (type: "button" | "modal") => {
    if (type === "button") {
      loadingButton.showLoading();
    } else if (type === "modal") {
      loadingModal.showLoading();
    }
  };

  const onSettled = (type: "button" | "modal") => {
    if (type === "button") {
      loadingButton.hideLoading();
    } else if (type === "modal") {
      loadingModal.hideLoading();
    }
  };

  const onError = (error: ResType) =>
    showToast({ type: "failed", message: error.message });

  const onSuccess = (message: string) =>
    showToast({ type: "success", message });

  return {
    auth,
    nav,
    onMutate,
    onSettled,
    onError,
    onSuccess,
  };
};

export default useHelper;
