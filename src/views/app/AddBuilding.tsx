import { AddContent, AddHeader } from "@components/shared";
import { FormSkeleton } from "@components/skeleton";
import MainContainer from "@containers/MainContainer";
import useBuildingController from "@controllers/buildingController";
import { buildingForm } from "@utils/constant/formConst";
import { generateDecryption } from "@utils/helper/generator";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

const AddBuilding = () => {
  const [searchParams] = useSearchParams();

  const { control, handleSubmit } = useForm({
    defaultValues: searchParams.get("pick")
      ? JSON.parse(
          generateDecryption(decodeURIComponent(searchParams.get("pick")!))
        )
      : searchParams.get("data")
      ? JSON.parse(
          generateDecryption(decodeURIComponent(searchParams.get("data")!))
        )
      : buildingForm.defaultValues,
  });

  const {
    useGetBuildingFormDropdownService,
    addBuildingService,
    updateBuildingService,
  } = useBuildingController();

  const { formData, isLoading } = useGetBuildingFormDropdownService(
    searchParams.get("data")
  );

  return (
    <MainContainer>
      <AddHeader
        title="Add Building"
        onSubmit={handleSubmit((body) => {
          if (searchParams.get("data")) {
            const param = JSON.parse(
              generateDecryption(decodeURIComponent(searchParams.get("data")!))
            );

            updateBuildingService(param);
          } else {
            addBuildingService(body);
          }
        })}
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
