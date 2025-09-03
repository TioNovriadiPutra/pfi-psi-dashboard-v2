import { AppHeader, AppTableContent } from "@components/shared";
import MainContainer from "@containers/MainContainer";
import useAnnotationController from "@controllers/annotationController"; // Annotation controller
import { AnnotationPageData } from "@utils/constant/pageConst"; // Annotation page constants

const Annotation = () => {
  const { useGetAnnotationsService } = useAnnotationController();

  const { finalData, isLoading } = useGetAnnotationsService();

  return (
    <MainContainer>
      <AppHeader headerData={AnnotationPageData.header} />

      <AppTableContent
        contentData={AnnotationPageData.content}
        fetchData={finalData[0]}
        isLoading={isLoading}
      />
    </MainContainer>
  );
};

export default Annotation;
