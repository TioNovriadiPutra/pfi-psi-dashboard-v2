import type { MapType } from "./formInterface";

export interface AuthStateType {
  token: string;
  username: string;
  setAuth: (data: { token: string; username: string }) => void;
  resetAuth: () => void;
  checkIsLoggedIn: () => void;
}

export interface LoadingStateType {
  show: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

export interface ToastStateType {
  show: boolean;
  type: "success" | "failed";
  message: string;
  showToast: (data: { type: "success" | "failed"; message: string }) => void;
  hideToast: () => void;
}

export interface ConfirmationStateType {
  show: boolean;
  title: string;
  description: string;
  onConfirm: (() => void) | null;
  showModal: (data: {
    title: string;
    description: string;
    onConfirm: () => void;
  }) => void;
  hideModal: () => void;
}

export interface SlideStateType {
  page: number;
  changePage: (page: number) => void;
  resetPage: () => void;
}

export interface DefectSlideStateType {
  page: number;
  reportId: number | null;
  changePage: (page: number, reportId?: number) => void;
  resetPage: () => void;
}

export interface OneThemeDataType {
  label: string;
  value: string;
  active: boolean;
}

export interface OneThemeStateType {
  data: OneThemeDataType[];
  onClick: (value: string) => void;
}

export interface DetailAccordionDataStateType {
  label: string;
  value: string;
}

export interface DetailAccordionStateType {
  title: string;
  data: DetailAccordionDataStateType[];
}

export interface DetailDataStateType {
  type: "text" | "map" | "accordion";
  label: string;
  value: string | MapType | DetailAccordionStateType[];
}

export interface DetailStateType {
  show: boolean;
  title: string;
  data: DetailDataStateType[];
  showModal: (data: { title: string; data: DetailDataStateType[] }) => void;
  hideModal: () => void;
}
