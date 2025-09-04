import { AddContent, AddHeader } from "@components/shared";
import { FormSkeleton } from "@components/skeleton";
import MainContainer from "@containers/MainContainer";
import useAnnotationController from "@controllers/annotationController";
import { annotationForm } from "@utils/constant/formConst";
import { useForm } from "react-hook-form";

const AddAnnotation = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: annotationForm.defaultValues,
  });

  const { useGetAnnotationFormDropdownService, addAnnotationService } =
    useAnnotationController();

  const { formData, isLoading } = useGetAnnotationFormDropdownService();

  return (
    <MainContainer>
      <AddHeader
        title="Annotation"
        onSubmit={handleSubmit((body) => addAnnotationService(body))}
      />

      {isLoading ? (
        <FormSkeleton />
      ) : (
        <AddContent
          contentData={formData.inputs}
          size="large"
          control={control}
          errors={errors}
        />
      )}
    </MainContainer>
  );
};

export default AddAnnotation;
