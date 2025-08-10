import { AddDefectContent } from "@components/custom";
import { AddHeader } from "@components/shared";
import { FormSkeleton } from "@components/skeleton";
import MainContainer from "@containers/MainContainer";
import useBuildingController from "@controllers/buildingController";
import { generateDecryption } from "@utils/helper/generator";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

const AddDefect = () => {
  const [searchParam] = useSearchParams();

  const { useGetBuildingDetailFormService } = useBuildingController();

  const { finalData, isLoading } = useGetBuildingDetailFormService(
    JSON.parse(generateDecryption(decodeURIComponent(searchParam.get("form")!)))
  );

  const { control } = useForm({
    defaultValues: finalData.defaultValues,
  });

  return (
    <MainContainer>
      <AddHeader title="Add Defect" />

      {isLoading ? (
        <FormSkeleton />
      ) : (
        <AddDefectContent defectData={finalData.data} control={control} />
      )}
    </MainContainer>
  );
};

export default AddDefect;
