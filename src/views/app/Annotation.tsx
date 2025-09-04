import { AppHeader, AppTableContent } from "@components/shared";
import MainContainer from "@containers/MainContainer";
import useAnnotationController from "@controllers/annotationController";
import { annotationPageData } from "@utils/constant/pageConst";

const Annotation = () => {
  const { useGetAnnotationsService } = useAnnotationController();

  const { finalData, isLoading } = useGetAnnotationsService();

  return (
    <MainContainer>
      <AppHeader headerData={annotationPageData.header} />

      <AppTableContent
        contentData={annotationPageData.content}
        fetchData={finalData[0]}
        isLoading={isLoading}
      />
    </MainContainer>
  );
};

export default Annotation;
