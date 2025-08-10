import useDefectModel from "@models/defectModel";

const useDefectController = () => {
  const { useGetDefectForm } = useDefectModel();

  const getDefectFormMutation = useGetDefectForm();

  return {
    getDefectFormService: (id: number) => getDefectFormMutation.mutate(id),
  };
};

export default useDefectController;
