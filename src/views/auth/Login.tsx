import { AuthContent } from "@components/shared";
import AuthContainer from "@containers/AuthContainer";
import useAuthController from "@controllers/authController";
import { loginForm } from "@utils/constant/formConst";

const Login = () => {
  const { loginService } = useAuthController();

  return (
    <AuthContainer>
      <AuthContent contentData={loginForm} isLogin onSubmit={loginService} />
    </AuthContainer>
  );
};

export default Login;
