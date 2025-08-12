import { AddDefectContent } from "@components/custom";
import { FormSkeleton } from "@components/skeleton";
import MainContainer from "@containers/MainContainer";
import useDefectController from "@controllers/defectController";
import { generateDecryption } from "@utils/helper/generator";
import { useState } from "react";
import { useSearchParams } from "react-router";

const AddDefect = () => {
  const [currPage, setCurrPage] = useState(0);

  const [searchParam] = useSearchParams();

  const { useGetDefectFormService } = useDefectController();

  const { finalData, isLoading } = useGetDefectFormService(
    JSON.parse(generateDecryption(decodeURIComponent(searchParam.get("form")!)))
  );

  return (
    <MainContainer>
      {isLoading ? (
        <FormSkeleton />
      ) : (
        <AddDefectContent
          defectData={finalData}
          currPage={currPage}
          buildingId={JSON.parse(
            generateDecryption(decodeURIComponent(searchParam.get("form")!))
          )}
          onPage={(index) => setCurrPage(index)}
        />
      )}
    </MainContainer>
  );
};

export default AddDefect;
