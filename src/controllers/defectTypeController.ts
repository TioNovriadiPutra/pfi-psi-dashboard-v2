import useDefectTypeModel from "@models/defectTypeModel";

const useDefectTypeController = () => {
  const { useGetDefectTypes } = useDefectTypeModel();

  const useGetDefectTypesService = () => {
    const { data, isLoading, isError, error } = useGetDefectTypes();

    if (!isLoading) {
    }
  };
};

export default useDefectTypeController;
