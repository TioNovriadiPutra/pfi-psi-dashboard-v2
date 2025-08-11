import { AddDefectContent } from "@components/custom";
import { AddHeader } from "@components/shared";
import { FormSkeleton } from "@components/skeleton";
import MainContainer from "@containers/MainContainer";
import useBuildingController from "@controllers/buildingController";
import useReportController from "@controllers/reportController";
import { generateDecryption } from "@utils/helper/generator";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

const AddDefect = () => {
  const [currPage, setCurrPage] = useState(0);

  const [searchParam] = useSearchParams();

  const { useGetBuildingDetailFormService } = useBuildingController();
  const { addReportService } = useReportController();

  const { finalData, isLoading } = useGetBuildingDetailFormService(
    JSON.parse(generateDecryption(decodeURIComponent(searchParam.get("form")!)))
  );

  const { control, handleSubmit } = useForm({
    defaultValues: finalData.defaultValues,
  });

  return (
    <MainContainer>
      <AddHeader
        title="Add Defect"
        onSubmit={handleSubmit((body) => {
          if (currPage === 0) {
            addReportService({
              ...body.report,
              building_id: JSON.parse(
                generateDecryption(decodeURIComponent(searchParam.get("form")!))
              ),
            });
          }
        })}
      />

      {isLoading ? (
        <FormSkeleton />
      ) : (
        <AddDefectContent
          defectData={finalData.data}
          control={control}
          currPage={currPage}
          onPage={(index) => setCurrPage(index)}
        />
      )}
    </MainContainer>
  );
};

export default AddDefect;
