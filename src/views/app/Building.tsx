import { AppHeader, AppTableContent } from "@components/shared";
import MainContainer from "@containers/MainContainer";
import useBuildingController from "@controllers/buildingController";
import { useBuilding } from "@stores/pageStore";
import { buildingPageData } from "@utils/constant/pageConst";

const Building = () => {
  const buildingPage = useBuilding();

  const { useGetBuildingsService } = useBuildingController();

  const { finalData, isLoading } = useGetBuildingsService();

  return (
    <MainContainer>
      <AppHeader headerData={buildingPageData[buildingPage.page].header} />

      <AppTableContent
        contentData={buildingPageData[buildingPage.page].content}
        fetchData={finalData[buildingPage.page]}
        isLoading={isLoading}
        pageData={buildingPage}
        tabData={buildingPageData.map((item) => item.content.title)}
      />
    </MainContainer>
  );
};

export default Building;
