import useHelper from "@hooks/useHelper";
import type { DropdownType } from "@interfaces/formInterface";
import {
  addProject,
  deleteProject,
  getProjectDetail,
  getProjects,
  updateProject,
} from "@services/projectService";
import { useConfirmationModal } from "@stores/modalStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@utils/config/client";
import { generateEncryption } from "@utils/helper/generator";

export interface ProjectInput {
  name: string;
  description: string;
  address_detail?: string;
  status: DropdownType | null;
}

export interface ProjectDTO extends Omit<ProjectInput, "status"> {
  id: number;
  status: number;
}

const useProjectModel = () => {
  const hideConfirmationModal = useConfirmationModal(
    (state) => state.hideModal
  );

  const { nav, onMutate, onSettled, onError, onSuccess } = useHelper();

  const useGetProjects = () =>
    useQuery({
      queryKey: ["getProjects"],
      queryFn: () => getProjects(),
    });

  const useAddProject = () =>
    useMutation({
      mutationKey: ["addProject"],
      mutationFn: (body: ProjectInput) => addProject(body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        nav("/project");
        queryClient.invalidateQueries({ queryKey: ["getProjects"] });
        onSuccess(res.message);
      },
    });

  const useGetProjectEdit = () =>
    useMutation({
      mutationKey: ["getProjectEdit"],
      mutationFn: (name: string) => getProjectDetail(name),
      onMutate: () => onMutate("modal"),
      onSettled: () => onSettled("modal"),
      onError,
      onSuccess: (res) => {
        const defaultValues: ProjectInput = {
          name: res.data.name,
          description: res.data.description,
          address_detail: res.data.address_detail,
          status: [
            { label: "Pending", value: 1 },
            { label: "Rejected", value: 2 },
            { label: "Accepted", value: 3 },
          ].find((item) => item.value === res.data.status)!,
        };

        nav(
          `/project/form?data=${encodeURIComponent(
            generateEncryption(JSON.stringify(defaultValues))
          )}`
        );
      },
    });

  const useUpdateProject = () =>
    useMutation({
      mutationKey: ["updateProject"],
      mutationFn: (data: { name: string; body: ProjectInput }) =>
        updateProject(data.name, data.body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        nav("/project");
        queryClient.invalidateQueries({ queryKey: ["getProjects"] });
        onSuccess(res.message);
      },
    });

  const useDeleteProject = () =>
    useMutation({
      mutationKey: ["deleteProject"],
      mutationFn: (name: string) => deleteProject(name),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError: (error) => {
        hideConfirmationModal();
        onError(error);
      },
      onSuccess: async (res) => {
        hideConfirmationModal();
        queryClient.invalidateQueries({ queryKey: ["getProjects"] });
        onSuccess(res.message);
      },
    });

  return {
    useGetProjects,
    useAddProject,
    useGetProjectEdit,
    useUpdateProject,
    useDeleteProject,
  };
};

export default useProjectModel;
