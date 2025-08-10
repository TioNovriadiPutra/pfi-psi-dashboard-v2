import type {
  LoadingStateType,
  OneThemeStateType,
  SlideStateType,
  ToastStateType,
} from "@interfaces/stateInterface";
import { create } from "zustand";

export const useLoadingButton = create<LoadingStateType>((set) => ({
  show: false,
  showLoading: () => set({ show: true }),
  hideLoading: () => set({ show: false }),
}));

export const useToast = create<ToastStateType>((set) => ({
  show: false,
  type: "failed",
  message: "Hello World",
  showToast: (data) => set({ show: true, ...data }),
  hideToast: () => set({ show: false, type: "failed", message: "" }),
}));

export const useOneTheme = create<OneThemeStateType>((set, get) => ({
  data: [
    {
      label: "Areas within a Temporary Restricted Area",
      value: "tra_poly",
      active: true,
    },
    {
      label: "Areas within 5km of aerodromes",
      value: "boundary_5km",
      active: true,
    },
    {
      label: "Areas within Danger Areas",
      value: "danger_areas",
      active: true,
    },
    {
      label: "Areas within Prohibited Areas",
      value: "prohibited_areas",
      active: true,
    },
    {
      label: "Areas within Restricted Areas",
      value: "restricted_areaspoly",
      active: true,
    },
    {
      label:
        "Prohibited Drone flying areas at NParks Nature Reserves, Nature Parks and Gardens",
      value: "drone_no_fly",
      active: true,
    },
    {
      label: "Protected Area under Section 7 Air Navigation Act",
      value: "mha_uav_2015",
      active: true,
    },
  ],
  onClick: (value) => {
    const current = get().data;

    const mapData = current.map((item) => {
      if (item.value === value) {
        Object.assign(item, {
          active: !item.active,
        });
      }

      return item;
    });

    set({ data: mapData });
  },
}));

export const useBuilding = create<SlideStateType>((set) => ({
  page: 0,
  changePage: (page) => set({ page }),
  resetPage: () => set({ page: 0 }),
}));
