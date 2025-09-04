import useHelper from "@hooks/useHelper";
import type { FetchDataType, FetchFinalDataType } from "@interfaces/pageInterface";
import useAnnotationModel from "@models/annotationModel";
import { useConfirmationModal } from "@stores/modalStore";
import { FaRegStickyNote } from "react-icons/fa";
import { useNavigate } from "react-router";

const useAnnotationController = () => {
  const showConfirmationModal = useConfirmationModal((state) => state.showModal);
  const {
    useGetAnnotations,
    useAddAnnotation,
    useGetAnnotationEdit,
    useUpdateAnnotation,
    useDeleteAnnotation,
  } = useAnnotationModel();

  const { onError } = useHelper();

  const addAnnotationMutation = useAddAnnotation();
  const getAnnotationEditMutation = useGetAnnotationEdit();
  const updateAnnotationMutation = useUpdateAnnotation();
  const deleteAnnotationMutation = useDeleteAnnotation();

  const useGetAnnotationsService = () => {
    const nav = useNavigate();
    const { data, isLoading, isError, error } = useGetAnnotations();

    let finalData: FetchDataType[] = [];

    if (!isLoading) {
      if (isError) {
        onError(error);
      } else if (data) {
        finalData = [
          {
            pagination: {
              page: data.data.page,
              items_per_page: data.data.items_per_page,
              total_count: data.data.total_count,
            },
            finalData: data.data.data.map((item) => ({
              id: item.id,
              row: [
                { type: "text", flex: "flex-2", label: item.project_name },
                { type: "text", flex: "flex-2", label: item.category },
                { type: "text", flex: "flex-3", label: item.description || "-" },
                { type: "text", flex: "flex-1", label: item.annotations.length },
              ],
              functions: [
                {
                  type: "custom",
                  icon: FaRegStickyNote,
                  label: "Preview",
                  onClick: () =>
                    nav(`/annotation/preview/${item.id}`),
                },
                {
                  type: "edit",
                  onClick: () => getAnnotationEditMutation.mutate(item.id),
                },
                {
                  type: "delete",
                  onClick: () =>
                    showConfirmationModal({
                      title: "Delete Annotation",
                      description: `Are you sure you want to delete annotation for project "${item.projectName}"? This action cannot be undone!`,
                      onConfirm: () => deleteAnnotationMutation.mutate(item.id),
                    }),
                },
              ],
            })) as FetchFinalDataType[],
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
    useGetAnnotationsService,
    addAnnotationService: (body: any) => addAnnotationMutation.mutate(body),
    updateAnnotationService: (data: { id: number; body: any }) =>
      updateAnnotationMutation.mutate(data),
  };
};

export default useAnnotationController;
