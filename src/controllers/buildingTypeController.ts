import useBuildingTypeModel from "@models/buildingTypeModel";

const useBuildingTypeController = () => {
  const {
    useAddBuildingType,
    useGetBuildingTypeEdit,
    useUpdateBuildingType,
    useDeleteBuildingType,
  } = useBuildingTypeModel();

  const addBuildingTypeMutation = useAddBuildingType();
  const getBuildingTypeEditMutation = useGetBuildingTypeEdit();
  const updateBuildingTypeMutation = useUpdateBuildingType();
  const deleteBuildingTypeMutation = useDeleteBuildingType();

  return {
    addBuildingTypeService: (body: any) => addBuildingTypeMutation.mutate(body),
    getBuildingTypeEditService: (name: string) =>
      getBuildingTypeEditMutation.mutate(name),
    updateBuildingTypeSerivce: (data: { name: string; body: any }) =>
      updateBuildingTypeMutation.mutate(data),
    deleteBuildingTypeService: (name: string) =>
      deleteBuildingTypeMutation.mutate(name),
  };
};

export default useBuildingTypeController;
