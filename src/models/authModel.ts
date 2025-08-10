import useHelper from "@hooks/useHelper";
import { login, logout, register } from "@services/authService";
import { useConfirmationModal } from "@stores/modalStore";
import { useMutation } from "@tanstack/react-query";
import { generateEncryption } from "@utils/helper/generator";

export interface LoginInput {
  username: string;
  password: string;
}

export interface RegisterInput extends LoginInput {
  name: string;
  email: string;
  password_confirmation: string;
}

export interface RefreshDTO {
  access_token: string;
  token_type: string;
}

export interface LoginDTO extends RefreshDTO {
  refresh_token: string;
  username: string;
}

export interface RegisterDTO {
  id: number;
  name: string;
  username: string;
  email: string;
  profile_image_url: string;
  tier_id: number | null;
}

const useAuthModel = () => {
  const hideConfirmationModal = useConfirmationModal(
    (state) => state.hideModal
  );

  const { auth, nav, onMutate, onSettled, onError, onSuccess } = useHelper();

  const useRegister = () =>
    useMutation({
      mutationKey: ["register"],
      mutationFn: (body: RegisterInput) => register(body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        nav("/login");
        onSuccess(res.message);
      },
    });

  const useLogin = () =>
    useMutation({
      mutationKey: ["login"],
      mutationFn: (body: LoginInput) => login(body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        const data = {
          token: res.data.access_token,
          username: res.data.username,
        };

        localStorage.setItem("@data", generateEncryption(JSON.stringify(data)));
        auth.setAuth({
          token: res.data.access_token,
          username: res.data.username,
        });

        onSuccess(res.message);
      },
    });

  const useLogout = () =>
    useMutation({
      mutationKey: ["logout"],
      mutationFn: () => logout(),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError: (err) => {
        hideConfirmationModal();
        onError(err);
      },
      onSuccess: (res) => {
        hideConfirmationModal();
        localStorage.removeItem("@data");
        auth.resetAuth();
        onSuccess(res.message);
      },
    });

  return {
    useRegister,
    useLogin,
    useLogout,
  };
};

export default useAuthModel;
