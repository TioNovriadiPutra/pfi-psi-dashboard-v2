import useHelper from "@hooks/useHelper";
import type { FormType } from "@interfaces/formInterface";
import type {
  FetchDataType,
  FetchFinalDataType,
} from "@interfaces/pageInterface";
import useAnnotationModel, {
  type AnnotationInput,
} from "@models/annotationModel";
import { useConfirmationModal } from "@stores/modalStore";
import { annotationForm } from "@utils/constant/formConst";
import { paginationHandler } from "@utils/helper/responseHandler";
import { FaRegStickyNote } from "react-icons/fa";
import { useNavigate } from "react-router";

const useAnnotationController = () => {
  const showConfirmationModal = useConfirmationModal(
    (state) => state.showModal
  );
  const {
    useGetAnnotations,
    useGetAnnotationFormDropdown,
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
            pagination: paginationHandler(
              data.data.page,
              data.data.items_per_page,
              data.data.total_count
            ),
            finalData: data.data.data.map((item) => ({
              id: item.id,
              row: [
                { type: "text", flex: "flex-2", label: item.project_name },
                { type: "text", flex: "flex-2", label: item.category },
                {
                  type: "text",
                  flex: "flex-2",
                  label: item.description || "-",
                },
                {
                  type: "text",
                  flex: "flex-1",
                  label: item.annotations.length,
                },
              ],
              functions: [
                {
                  type: "custom",
                  icon: FaRegStickyNote,
                  label: "Preview",
                  onClick: () => nav(`/annotation/preview/${item.id}`),
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
                      description: `Are you sure you want to delete annotation for project "${item.project_name}"? This action cannot be undone!`,
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

  const useGetAnnotationFormDropdownService = () => {
    const responses = useGetAnnotationFormDropdown();

    const isLoading = responses.some((response) => response.isLoading);
    const isError = responses.some((response) => response.isError);
    const error = responses.find((response) => response.error !== undefined);

    let formData: FormType<AnnotationInput> = {
      ...annotationForm,
    };

    if (!isLoading) {
      if (isError) {
        onError(error!.error!);
      } else {
        formData = {
          ...annotationForm,
          inputs: annotationForm.inputs.map((input) =>
            input.map((input) => {
              if (input.name === "building_id")
                return {
                  ...input,
                  items: responses[0].data?.data.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })),
                };

              return input;
            })
          ),
        };
      }
    }

    return {
      formData,
      isLoading,
    };
  };

  return {
    useGetAnnotationsService,
    useGetAnnotationFormDropdownService,
    addAnnotationService: (body: any) => addAnnotationMutation.mutate(body),
    updateAnnotationService: (data: { id: number; body: any }) =>
      updateAnnotationMutation.mutate(data),
  };
};

export default useAnnotationController;
