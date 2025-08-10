import type { PaginationType, ResType } from "@interfaces/resInterface";
import type { ReportDTO } from "@models/reportModel";
import { API_ENDPOINT } from "@utils/config/api";
import { axiosInstance } from "@utils/config/axios";
import { errorResponse, successResponse } from "@utils/helper/responseHandler";

export const getReports = async (): Promise<
  ResType<PaginationType<ReportDTO[]>>
> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINT.getReports, {
      skipAuth: true,
    });

    return successResponse<PaginationType<ReportDTO[]>>(
      response,
      "Data fetched!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};
