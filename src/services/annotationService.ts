import type { PaginationType, ResType } from "@interfaces/resInterface";
import type { AnnotationDTO } from "@models/annotationModel";
import { API_ENDPOINT } from "@utils/config/api";
import { axiosInstance } from "@utils/config/axios";
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
