import { AppHeader, AppTableContent } from "@components/shared";
import MainContainer from "@containers/MainContainer";
import useReportController from "@controllers/reportController";
import { reportPageData } from "@utils/constant/pageConst";

const Report = () => {
  const { useGetReportsService } = useReportController();

  const { finalData, isLoading } = useGetReportsService();

  return (
    <MainContainer>
      <AppHeader headerData={reportPageData.header} />

      <AppTableContent
        contentData={reportPageData.content}
        fetchData={finalData[0]}
        isLoading={isLoading}
      />
    </MainContainer>
  );
};

export default Report;
