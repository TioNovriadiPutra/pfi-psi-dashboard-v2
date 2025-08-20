import { Button, Form } from "@components/shared";
import type { FormType, InputType } from "@interfaces/formInterface";
import { useLoadingButton } from "@stores/pageStore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

type Props = {
  formData: Omit<FormType<any>, "inputs"> & { inputs: InputType[] };
  isLogin?: boolean;
  onSubmit?: (body: any) => void;
};

const AuthForm = ({ formData, isLogin = false, onSubmit }: Props) => {
  const loadingButton = useLoadingButton((state) => state.show);

  const nav = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: formData.defaultValues,
  });

  return (
    <form
      className="w-full max-w-[380px] self-center gap-[48px] overflow-auto"
      onSubmit={handleSubmit((body) => {
        if (onSubmit) onSubmit(body);
      })}
    >
      <div className="gap-md">
        <Form listData={formData.inputs} control={control} />

        {isLogin && (
          <a
            href="/forgot"
            className="text-body-sm font-normal text-neutral-500 underline self-end"
          >
            Forgot Password?
          </a>
        )}
      </div>

      <div className={`${isLogin ? "gap-md" : "gap-xs"}`}>
        <Button
          buttonData={{
            label: formData.buttonLabel!,
            color: "bg-primary-500",
            hover: "hover:bg-primary-600",
          }}
          type="submit"
          isLoading={loadingButton}
        />

        {isLogin ? (
          <p className="text-body-sm font-normal text-neutral-500 text-center">
            Don't have an account?{" "}
            <span>
              <a href="/register" className="font-semibold text-primary-500">
                Register here
              </a>
            </span>
          </p>
        ) : (
          <Button
            buttonData={{
              label: "Back",
              color: "bg-neutral-0",
              hover: "hover:bg-primary-200",
            }}
            onClick={() => nav(-1)}
          />
        )}
      </div>
    </form>
  );
};

export default AuthForm;
