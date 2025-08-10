import type { PaginationType, ResType } from "@interfaces/resInterface";
import type { ReportDTO, ReportInput } from "@models/reportModel";
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

export const addReport = async (
  body: ReportInput
): Promise<ResType<ReportDTO>> => {
  try {
    const response = await axiosInstance.post(API_ENDPOINT.addReport, body);

    return successResponse<ReportDTO>(response, "Report added!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const deleteReport = async (
  reportNo: string
): Promise<ResType<{ message: string }>> => {
  try {
    const response = await axiosInstance.delete(
      `${API_ENDPOINT.addReport}/${encodeURIComponent(reportNo)}`
    );

    return successResponse<{ message: string }>(response, "Report deleted!");
  } catch (error) {
    throw errorResponse(error);
  }
};
