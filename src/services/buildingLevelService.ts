import type { PaginationType, ResType } from "@interfaces/resInterface";
import type {
  BuildingLevelDTO,
  BuildingLevelInput,
} from "@models/buildingLevelModel";
import { API_ENDPOINT } from "@utils/config/api";
import { axiosInstance } from "@utils/config/axios";
import { errorResponse, successResponse } from "@utils/helper/responseHandler";

export const getBuildingLevels = async (): Promise<
  ResType<PaginationType<BuildingLevelDTO[]>>
> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINT.getBuildingLevels, {
      skipAuth: true,
    });

    return successResponse<PaginationType<BuildingLevelDTO[]>>(
      response,
      "Data fetched!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const addBuildingLevel = async (
  buildingId: number,
  body: BuildingLevelInput
): Promise<ResType<BuildingLevelDTO>> => {
  try {
    const mapBody = {
      ...body,
      building_id: buildingId,
    };

    const response = await axiosInstance.post(
      API_ENDPOINT.addBuildingLevel,
      mapBody
    );

    return successResponse<BuildingLevelDTO>(response, "Building level added!");
  } catch (error) {
    throw errorResponse(error);
  }
};
