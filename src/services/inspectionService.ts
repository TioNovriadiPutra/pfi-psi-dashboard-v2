import type { ResType } from "@interfaces/resInterface";
import type { InspectionDTO, InspectionInput } from "@models/inspectionModel";
import { API_ENDPOINT } from "@utils/config/api";
import { axiosInstance } from "@utils/config/axios";
import { errorResponse, successResponse } from "@utils/helper/responseHandler";

export const addInspection = async (
  body: InspectionInput
): Promise<ResType<InspectionDTO>> => {
  try {
    const response = await axiosInstance.post(API_ENDPOINT.addInspection, body);

    return successResponse<InspectionDTO>(response, "Inspection added!");
  } catch (error) {
    throw errorResponse(error);
  }
};
