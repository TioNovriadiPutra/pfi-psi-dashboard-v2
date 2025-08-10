import { AppHeader, AppTableContent } from "@components/shared";
import MainContainer from "@containers/MainContainer";
import useProjectController from "@controllers/projectController";
import { projectPageData } from "@utils/constant/pageConst";

const Project = () => {
  const { useGetProjectsService } = useProjectController();

  const { finalData, isLoading } = useGetProjectsService();

  return (
    <MainContainer>
      <AppHeader headerData={projectPageData.header} />

      <AppTableContent
        contentData={projectPageData.content}
        fetchData={finalData[0]}
        isLoading={isLoading}
      />
    </MainContainer>
  );
};

export default Project;
