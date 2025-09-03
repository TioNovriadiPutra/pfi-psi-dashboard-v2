import { AddContent, AddHeader } from "@components/shared";
import MainContainer from "@containers/MainContainer";
import { annotationForm } from "@utils/constant/formConst";
import { useForm } from "react-hook-form";

const Annotation = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: annotationForm.defaultValues,
  });

  return (
    <MainContainer>
      <AddHeader
        title="Annotation"
        onSubmit={handleSubmit((body) => console.log(body))}
      />

      <AddContent
        contentData={annotationForm.inputs}
        size="large"
        control={control}
        errors={errors}
      />
    </MainContainer>
  );
};

export default Annotation;
