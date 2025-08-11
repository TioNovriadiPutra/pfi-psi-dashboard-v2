import { AddContent, AddHeader } from "@components/shared";
import MainContainer from "@containers/MainContainer";
import useDefectTypeController from "@controllers/defectTypeController";
import { defectTypeForm } from "@utils/constant/formConst";
import { generateDecryption } from "@utils/helper/generator";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

const AddDefectType = () => {
  const [searchParams] = useSearchParams();

  const { control, handleSubmit } = useForm({
    defaultValues: searchParams.get("data")
      ? JSON.parse(
          generateDecryption(decodeURIComponent(searchParams.get("data")!))
        )
      : defectTypeForm.defaultValues,
  });

  const { addDefectTypeService, updateDefectTypeService } =
    useDefectTypeController();

  return (
    <MainContainer>
      <AddHeader
        title="Add Defect Type"
        onSubmit={handleSubmit((body) => {
          if (searchParams.get("data")) {
            const param = JSON.parse(
              generateDecryption(decodeURIComponent(searchParams.get("data")!))
            );

            updateDefectTypeService({ name: param.name, body });
          } else {
            addDefectTypeService(body);
          }
        })}
      />

      <AddContent contentData={defectTypeForm.inputs} control={control} />
    </MainContainer>
  );
};

export default AddDefectType;
