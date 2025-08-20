import { AddDefectContent } from "@components/custom";
import { FormSkeleton } from "@components/skeleton";
import MainContainer from "@containers/MainContainer";
import useDefectController from "@controllers/defectController";
import { generateDecryption } from "@utils/helper/generator";
import { useSearchParams } from "react-router";

const AddDefect = () => {
  const [searchParam] = useSearchParams();

  const { useGetDefectFormService } = useDefectController();

  const { formData, isLoading } = useGetDefectFormService(
    JSON.parse(generateDecryption(decodeURIComponent(searchParam.get("form")!)))
  );

  return (
    <MainContainer>
      {isLoading ? (
        <FormSkeleton />
      ) : (
        <AddDefectContent
          defectData={formData}
          buildingId={JSON.parse(
            generateDecryption(decodeURIComponent(searchParam.get("form")!))
          )}
        />
      )}
    </MainContainer>
  );
};

export default AddDefect;
