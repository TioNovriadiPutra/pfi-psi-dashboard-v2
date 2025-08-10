import useAuthModel from "@models/authModel";

const useAuthController = () => {
  const { useRegister, useLogin, useLogout } = useAuthModel();

  const registerMutation = useRegister();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  return {
    registerService: (body: any) => registerMutation.mutate(body),
    loginService: (body: any) => loginMutation.mutate(body),
    logoutService: () => logoutMutation.mutate(),
  };
};

export default useAuthController;
