import type { PaginationType, ResType } from "@interfaces/resInterface";
import type { DefectTypeDTO, DefectTypeInput } from "@models/defectTypeModel";
import { API_ENDPOINT } from "@utils/config/api";
import { axiosInstance } from "@utils/config/axios";
import { errorResponse, successResponse } from "@utils/helper/responseHandler";

export const getDefectTypes = async (): Promise<
  ResType<PaginationType<DefectTypeDTO[]>>
> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINT.getDefectTypes, {
      skipAuth: true,
    });

    return successResponse<PaginationType<DefectTypeDTO[]>>(
      response,
      "Data fetched!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const addDefectType = async (
  body: DefectTypeInput
): Promise<ResType<DefectTypeDTO>> => {
  try {
    const response = await axiosInstance.post(API_ENDPOINT.addDefectType, body);

    return successResponse<DefectTypeDTO>(response, "Defect type added!");
  } catch (error) {
    throw errorResponse(error);
  }
};
