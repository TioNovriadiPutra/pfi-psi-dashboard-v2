import type { PaginationType, ResType } from "@interfaces/resInterface";
import type { AnnotationDTO, AnnotationInput } from "@models/annotationModel";
import { API_ENDPOINT } from "@utils/config/api";
import { axiosCloudinaryInstance, axiosInstance } from "@utils/config/axios";
import { errorResponse, successResponse } from "@utils/helper/responseHandler";

export const getAnnotations = async (
  page: number,
  itemsPerPage: number
): Promise<ResType<PaginationType<AnnotationDTO[]>>> => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINT.getAnnotations}?page=${page}&items_per_page=${itemsPerPage}`,
      { skipAuth: true }
    );

    return successResponse<PaginationType<AnnotationDTO[]>>(
      response,
      "Data fetched!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const getAnnotationDetail = async (
  id: number
): Promise<ResType<AnnotationDTO>> => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINT.getAnnotations}/${id}`
    );

    return successResponse<AnnotationDTO>(response, "Annotation fetched!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const addAnnotation = async (
  body: AnnotationInput
): Promise<ResType<AnnotationDTO>> => {
  try {
    const url = await axiosCloudinaryInstance.post("/image/upload", {
      file: body.image,
      upload_preset: "pfi-psi-dashboard",
    });

    const response = await axiosInstance.post(API_ENDPOINT.getAnnotations, {
      ...body,
      image: url.data.secure_url,
    });

    return successResponse<AnnotationDTO>(response, "Annotation added!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const updateAnnotation = async (
  id: number,
  body: AnnotationInput
): Promise<ResType<{ message: string }>> => {
  try {
    const response = await axiosInstance.patch(
      `${API_ENDPOINT.getAnnotations}/${id}`,
      body
    );

    return successResponse<{ message: string }>(
      response,
      "Annotation updated!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const deleteAnnotation = async (
  id: number
): Promise<ResType<{ message: string }>> => {
  try {
    const response = await axiosInstance.delete(
      `${API_ENDPOINT.getAnnotations}/${id}`
    );

    return successResponse<{ message: string }>(
      response,
      "Annotation deleted!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};
