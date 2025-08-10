import type {
  ConfirmationStateType,
  DetailStateType,
  LoadingStateType,
} from "@interfaces/stateInterface";
import { create } from "zustand";

export const useLoadingModal = create<LoadingStateType>((set) => ({
  show: false,
  showLoading: () => set({ show: true }),
  hideLoading: () => set({ show: false }),
}));

export const useConfirmationModal = create<ConfirmationStateType>((set) => ({
  show: false,
  title: "",
  description: "",
  onConfirm: null,
  showModal: (data) => set({ show: true, ...data }),
  hideModal: () =>
    set({ show: false, title: "", description: "", onConfirm: null }),
}));

export const useDetailModal = create<DetailStateType>((set) => ({
  show: false,
  title: "",
  data: [],
  showModal: (data) => set({ show: true, ...data }),
  hideModal: () => set({ show: false, title: "", data: [] }),
}));
