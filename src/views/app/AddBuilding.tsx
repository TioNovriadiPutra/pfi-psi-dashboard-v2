import { AddContent, AddHeader } from "@components/shared";
import { FormSkeleton } from "@components/skeleton";
import MainContainer from "@containers/MainContainer";
import useBuildingController from "@controllers/buildingController";
import { buildingForm } from "@utils/constant/formConst";
import { useForm } from "react-hook-form";

const AddBuilding = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: buildingForm.defaultValues,
  });

  const { useGetBuildingFormDropdownService, addBuildingService } =
    useBuildingController();

  const { formData, isLoading } = useGetBuildingFormDropdownService();

  return (
    <MainContainer>
      <AddHeader
        title="Add Building"
        onSubmit={handleSubmit((body) => addBuildingService(body))}
      />

      {isLoading ? (
        <FormSkeleton />
      ) : (
        <AddContent contentData={formData.inputs} control={control} />
      )}
    </MainContainer>
  );
};

export default AddBuilding;
