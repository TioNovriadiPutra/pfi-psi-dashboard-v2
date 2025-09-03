import type { PaginationType, ResType } from "@interfaces/resInterface";
import type { AnnotationDTO, AnnotationInput } from "@models/annotationModel";
import { API_ENDPOINT } from "@utils/config/api";
import { axiosInstance } from "@utils/config/axios";
import { errorResponse, successResponse } from "@utils/helper/responseHandler";

/** Get paginated list of annotations */
export const getAnnotations = async (
  page: number,
  itemsPerPage: number
): Promise<ResType<PaginationType<AnnotationDTO[]>>> => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINT.getAnnotation}?page=${page}&items_per_page=${itemsPerPage}`
    );
    return successResponse<PaginationType<AnnotationDTO[]>>(
      response,
      "Annotations fetched!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

/** Get detail of a single annotation */
export const getAnnotationDetail = async (
  id: number
): Promise<ResType<AnnotationDTO>> => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINT.getAnnotation}/${id}`
    );
    return successResponse<AnnotationDTO>(response, "Annotation fetched!");
  } catch (error) {
    throw errorResponse(error);
  }
};

/** Add a new annotation */
export const addAnnotation = async (
  body: AnnotationInput
): Promise<ResType<AnnotationDTO>> => {
  try {
    const response = await axiosInstance.post(API_ENDPOINT.getAnnotation, body);
    return successResponse<AnnotationDTO>(response, "Annotation added!");
  } catch (error) {
    throw errorResponse(error);
  }
};

/** Update an existing annotation */
export const updateAnnotation = async (
  id: number,
  body: AnnotationInput
): Promise<ResType<{ message: string }>> => {
  try {
    const response = await axiosInstance.patch(
      `${API_ENDPOINT.getAnnotation}/${id}`,
      body
    );
    return successResponse<{ message: string }>(response, "Annotation updated!");
  } catch (error) {
    throw errorResponse(error);
  }
};

/** Delete an annotation */
export const deleteAnnotation = async (
  id: number
): Promise<ResType<{ message: string }>> => {
  try {
    const response = await axiosInstance.delete(
      `${API_ENDPOINT.getAnnotation}/${id}`
    );
    return successResponse<{ message: string }>(response, "Annotation deleted!");
  } catch (error) {
    throw errorResponse(error);
  }
};
