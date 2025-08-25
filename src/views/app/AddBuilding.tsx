import { AddContent, AddHeader } from "@components/shared";
import { FormSkeleton } from "@components/skeleton";
import MainContainer from "@containers/MainContainer";
import useBuildingController from "@controllers/buildingController";
import { useFormSlider } from "@stores/pageStore";
import { buildingForm } from "@utils/constant/formConst";
import { generateDecryption } from "@utils/helper/generator";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

const AddBuilding = () => {
  const changeFormSlider = useFormSlider((state) => state.changePage);

  const [searchParams] = useSearchParams();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: searchParams.get("pick")
      ? JSON.parse(
          generateDecryption(decodeURIComponent(searchParams.get("pick")!))
        )
      : searchParams.get("data")
      ? JSON.parse(
          generateDecryption(decodeURIComponent(searchParams.get("data")!))
        ).defaultValues
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

  useEffect(() => {
    const errorKeys = Object.keys(errors);

    if (errorKeys.length > 0) {
      if (
        errorKeys.filter((key) => key !== "elevations" && key !== "levels")
          .length > 0
      ) {
        changeFormSlider(0);
      } else {
        if (errorKeys.filter((key) => key === "elevations").length > 0) {
          changeFormSlider(2);
        } else if (errorKeys.filter((key) => key === "levels").length > 0) {
          changeFormSlider(3);
        }
      }
    }
  }, [isSubmitting]);

  return (
    <MainContainer>
      <AddHeader
        title={`${searchParams.get("data") ? "Edit" : "Add"} Building`}
        onSubmit={handleSubmit((body) => {
          if (searchParams.get("data")) {
            const params = JSON.parse(
              generateDecryption(decodeURIComponent(searchParams.get("data")!))
            );

            updateBuildingService({ id: params.id, body });
          } else {
            addBuildingService(body);
          }
        })}
      />

      {isLoading ? (
        <FormSkeleton />
      ) : (
        <AddContent
          contentData={formData.inputs}
          control={control}
          errors={errors}
        />
      )}
    </MainContainer>
  );
};

export default AddBuilding;
