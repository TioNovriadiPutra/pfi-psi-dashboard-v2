import { AddContent, AddHeader } from "@components/shared";
import MainContainer from "@containers/MainContainer";
import useBuildingTypeController from "@controllers/buildingTypeController";
import { buildingTypeForm } from "@utils/constant/formConst";
import { generateDecryption } from "@utils/helper/generator";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

const AddBuildingType = () => {
  const [searchParams] = useSearchParams();

  const { control, handleSubmit } = useForm({
    defaultValues: searchParams.get("data")
      ? JSON.parse(
          generateDecryption(decodeURIComponent(searchParams.get("data")!))
        )
      : buildingTypeForm.defaultValues,
  });

  const { addBuildingTypeService, updateBuildingTypeSerivce } =
    useBuildingTypeController();

  return (
    <MainContainer>
      <AddHeader
        title="Add Building Type"
        onSubmit={handleSubmit((body) => {
          if (searchParams.get("data")) {
            const param = JSON.parse(
              generateDecryption(decodeURIComponent(searchParams.get("data")!))
            );

            updateBuildingTypeSerivce({ name: param.name, body });
          } else {
            addBuildingTypeService(body);
          }
        })}
      />

      <AddContent contentData={buildingTypeForm.inputs} control={control} />
    </MainContainer>
  );
};

export default AddBuildingType;
