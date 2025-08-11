import { AppHeader, AppTableContent } from "@components/shared";
import MainContainer from "@containers/MainContainer";
import useDefectTypeController from "@controllers/defectTypeController";
import { useMaster } from "@stores/pageStore";
import { masterPageData } from "@utils/constant/pageConst";

const Master = () => {
  const masterPage = useMaster();

  const { useGetDefectTypesService } = useDefectTypeController();

  const { finalData, isLoading } = useGetDefectTypesService();

  return (
    <MainContainer>
      <AppHeader headerData={masterPageData[masterPage.page].header} />

      <AppTableContent
        contentData={masterPageData[masterPage.page].content}
        fetchData={finalData[masterPage.page]}
        isLoading={isLoading}
        pageData={masterPage}
        tabData={masterPageData.map((item) => item.content.title)}
      />
    </MainContainer>
  );
};

export default Master;
