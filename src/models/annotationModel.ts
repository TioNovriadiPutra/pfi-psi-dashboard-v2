import useHelper from "@hooks/useHelper";
import type { DropdownType } from "@interfaces/formInterface";
import {
  addAnnotation,
  deleteAnnotation,
  getAnnotationDetail,
  getAnnotations,
  updateAnnotation,
} from "@services/annotationService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@utils/config/client";

export interface AnnotationData {
  type: "square" | "text" | "line";
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
}

export interface AnnotationInput {
  building_id: Number;
  project_name: string;
  image: string;
  category?: DropdownType;
  description?: string;
  annotations: AnnotationData[];
}

export interface AnnotationDTO extends Omit<AnnotationInput, "category"> {
  id: number;
  category: string;
  created_at: string;
}

const useAnnotationModel = () => {
  const {
    confirmationModal,
    pagination,
    nav,
    onMutate,
    onSettled,
    onError,
    onSuccess,
  } = useHelper();

  const useGetAnnotations = () =>
    useQuery({
      queryKey: ["getAnnotations", pagination.page],
      queryFn: () => getAnnotations(pagination.page, pagination.items_per_page),
    });

  const useAddAnnotation = () =>
    useMutation({
      mutationKey: ["addAnnotation"],
      mutationFn: (body: AnnotationInput) => addAnnotation(body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        nav("/annotation");
        queryClient.invalidateQueries({ queryKey: ["getAnnotations"] });
        onSuccess(res.message);
      },
    });

  const useGetAnnotationEdit = () =>
    useMutation({
      mutationKey: ["getAnnotationEdit"],
      mutationFn: (id: number) => getAnnotationDetail(id),
      onMutate: () => onMutate("modal"),
      onSettled: () => onSettled("modal"),
      onError,
      onSuccess: (res) => {
        const defaultValues: AnnotationInput = {
          project_name: res.data.project_name,
          category: undefined,
          description: res.data.description,
          image: res.data.image,
          annotations: res.data.annotations.map((ann: any) => ({
            type: ann.type,
            x: ann.x,
            y: ann.y,
            width: ann.width,
            height: ann.height,
            text: ann.text,
          })),
        };

        nav(
          `/annotation/form?data=${encodeURIComponent(
            JSON.stringify(defaultValues)
          )}`
        );
      },
    });

  const useUpdateAnnotation = () =>
    useMutation({
      mutationKey: ["updateAnnotation"],
      mutationFn: (data: { id: number; body: AnnotationInput }) =>
        updateAnnotation(data.id, data.body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        nav("/annotation");
        queryClient.invalidateQueries({ queryKey: ["getAnnotations"] });
        onSuccess(res.message);
      },
    });

  const useDeleteAnnotation = () =>
    useMutation({
      mutationKey: ["deleteAnnotation"],
      mutationFn: (id: number) => deleteAnnotation(id),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError: (error) => {
        confirmationModal.hideModal();
        onError(error);
      },
      onSuccess: async (res) => {
        confirmationModal.hideModal();
        queryClient.invalidateQueries({ queryKey: ["getAnnotations"] });
        onSuccess(res.message);
      },
    });

  return {
    useGetAnnotations,
    useAddAnnotation,
    useGetAnnotationEdit,
    useUpdateAnnotation,
    useDeleteAnnotation,
  };
};

export default useAnnotationModel;
