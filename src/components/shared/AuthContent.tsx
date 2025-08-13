import { AuthForm } from "@components/custom";
import type { AuthContentType } from "@interfaces/formInterface";

type Props = {
  contentData: AuthContentType<any>;
  isLogin?: boolean;
  onSubmit?: (body: any) => void;
};

const AuthContent = ({ contentData, isLogin, onSubmit }: Props) => {
  return (
    <div className="flex-1 w-full max-w-[512px] gap-[64px] overflow-hidden max-h-[calc(100dvh-72px)] justify-center px-md">
      <div className="items-center self-center gap-sm max-w-[336px]">
        <img src="/favicon.ico" alt="MaxzRange" className="size-[30px]" />

        <div className="gap-xs">
          <h1 className="text-neutral-900 text-center">{contentData.title}</h1>

          <p className="text-body-sm font-normal text-neutral-500 text-center">
            {contentData.subTitle}
          </p>
        </div>
      </div>

      <AuthForm
        formData={contentData.form}
        isLogin={isLogin}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthContent;
