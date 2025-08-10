import type { AuthStateType } from "@interfaces/stateInterface";
import { generateDecryption } from "@utils/helper/generator";
import { create } from "zustand";

export const useAuth = create<AuthStateType>((set) => ({
  token: "",
  username: "",
  setAuth: (data) => set(data),
  resetAuth: () => set({ token: "", username: "" }),
  checkIsLoggedIn: () => {
    const authData = localStorage.getItem("@data");

    if (authData) {
      const decryptData = JSON.parse(generateDecryption(authData));

      set({ token: decryptData.token, username: decryptData.username });
    }
  },
}));
