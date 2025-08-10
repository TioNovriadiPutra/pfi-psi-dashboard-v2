import useHelper from "@hooks/useHelper";
import type {
  FetchDataType,
  FetchFinalDataType,
} from "@interfaces/pageInterface";
import useProjectModel from "@models/projectModel";
import { useConfirmationModal } from "@stores/modalStore";
import { paginationHandler } from "@utils/helper/responseHandler";
import { FaRegBuilding } from "react-icons/fa";

const useProjectController = () => {
  const showConfirmationModal = useConfirmationModal(
    (state) => state.showModal
  );

  const {
    useGetProjects,
    useAddProject,
    useGetProjectEdit,
    useUpdateProject,
    useDeleteProject,
  } = useProjectModel();

  const { onError } = useHelper();

  const addProjectMutation = useAddProject();
  const getProjectEditMutation = useGetProjectEdit();
  const updateProjectMutation = useUpdateProject();
  const deleteProjectMutation = useDeleteProject();

  const useGetProjectsService = () => {
    const { data, isLoading, isError, error } = useGetProjects();

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
                { type: "text", flex: "flex-2", label: item.name },
                { type: "text", flex: "flex-2", label: item.description },
                {
                  type: "text",
                  flex: "flex-2",
                  label: item.address_detail || "-",
                },
                {
                  type: item.status
                    ? item.status === 1
                      ? "pending"
                      : item.status === 2
                      ? "rejected"
                      : "accepted"
                    : "text",
                  flex: "flex-1",
                  label: item.status
                    ? item.status === 1
                      ? "Pending"
                      : item.status === 2
                      ? "Rejected"
                      : "Accepted"
                    : "-",
                },
              ],
              functions: [
                {
                  type: "custom",
                  icon: FaRegBuilding,
                  label: "Add Building",
                  onClick: () => console.log("Add Building"),
                },
                {
                  type: "edit",
                  onClick: () => getProjectEditMutation.mutate(item.name),
                },
                {
                  type: "delete",
                  onClick: () =>
                    showConfirmationModal({
                      title: "Delete Project",
                      description: `Are you sure you want to delete |"${item.name}"| project? This action cannot be undo!`,
                      onConfirm: () => deleteProjectMutation.mutate(item.name),
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
    useGetProjectsService,
    addProjectService: (body: any) => addProjectMutation.mutate(body),
    updateProjectService: (data: { name: string; body: any }) =>
      updateProjectMutation.mutate(data),
  };
};

export default useProjectController;
