import { AuthContent } from "@components/shared";
import AuthContainer from "@containers/AuthContainer";
import useAuthController from "@controllers/authController";
import { registerForm } from "@utils/constant/formConst";

const Register = () => {
  const { registerService } = useAuthController();

  return (
    <AuthContainer>
      <AuthContent contentData={registerForm} onSubmit={registerService} />
    </AuthContainer>
  );
};

export default Register;
