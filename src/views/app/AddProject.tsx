import { AddContent, AddFooter, AddHeader } from "@components/shared";
import MainContainer from "@containers/MainContainer";
import useProjectController from "@controllers/projectController";
import useResponsive from "@hooks/useResponsive";
import { projectForm } from "@utils/constant/formConst";
import { generateDecryption } from "@utils/helper/generator";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

const AddProject = () => {
  const [searchParams] = useSearchParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: searchParams.get("data")
      ? JSON.parse(
          generateDecryption(decodeURIComponent(searchParams.get("data")!))
        )
      : projectForm.defaultValues,
  });

  const { isTablet } = useResponsive();

  const { addProjectService, updateProjectService } = useProjectController();

  const onHandleSubmit = handleSubmit((body) => {
    if (searchParams.get("data")) {
      const param = JSON.parse(
        generateDecryption(decodeURIComponent(searchParams.get("data")!))
      );

      updateProjectService({ name: param.name, body });
    } else {
      addProjectService(body);
    }
  });

  return (
    <MainContainer type="add">
      <AddHeader title="Add Project" onSubmit={onHandleSubmit} />

      <AddContent
        contentData={projectForm.inputs}
        control={control}
        errors={errors}
      />

      {isTablet && <AddFooter onSubmit={onHandleSubmit} />}
    </MainContainer>
  );
};

export default AddProject;
