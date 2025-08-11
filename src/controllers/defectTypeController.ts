import useHelper from "@hooks/useHelper";
import type {
  FetchDataType,
  FetchFinalDataType,
} from "@interfaces/pageInterface";
import useDefectTypeModel from "@models/defectTypeModel";
import { paginationHandler } from "@utils/helper/responseHandler";
import moment from "moment";

const useDefectTypeController = () => {
  const {
    useGetDefectTypes,
    useAddDefectType,
    useGetDefectTypeEdit,
    useUpdateDefectType,
    useDeleteDefectType,
  } = useDefectTypeModel();

  const { confirmationModal, onError } = useHelper();

  const addDefectTypeMutation = useAddDefectType();
  const getDefectTypeEditMutation = useGetDefectTypeEdit();
  const updateDefectTypeMutation = useUpdateDefectType();
  const deleteDefectTypeMutation = useDeleteDefectType();

  const useGetDefectTypesService = () => {
    const { data, isLoading, isError, error } = useGetDefectTypes();

    let finalData: FetchDataType[] = [];

    if (!isLoading) {
      if (isError) {
        onError(error);
      } else if (data) {
        finalData = [
          {
            pagination: paginationHandler(
              data.data.page,
              data.data.items_per_page,
              data.data.total_count
            ),
            finalData: data.data.data.map(
              (item) =>
                ({
                  id: item.id,
                  row: [
                    { flex: "flex-1", type: "text", label: item.name },
                    {
                      flex: "flex-1",
                      type: "text",
                      label: moment(item.created_at).format("ddd, DD MMM YYYY"),
                    },
                  ],
                  functions: [
                    {
                      type: "edit",
                      onClick: () =>
                        getDefectTypeEditMutation.mutate(item.name),
                    },
                    {
                      type: "delete",
                      onClick: () =>
                        confirmationModal.showModal({
                          title: "Delete Defect Type",
                          description: `Are you sure you want to delete |"${item.name}"| type? This action cannot be undo!`,
                          onConfirm: () =>
                            deleteDefectTypeMutation.mutate(item.name),
                        }),
                    },
                  ],
                } as FetchFinalDataType)
            ),
          },
        ];
      }
    }

    return {
      finalData,
      isLoading,
    };
  };

  return {
    useGetDefectTypesService,
    addDefectTypeService: (body: any) => addDefectTypeMutation.mutate(body),
    updateDefectTypeService: (data: { name: string; body: any }) =>
      updateDefectTypeMutation.mutate(data),
  };
};

export default useDefectTypeController;
