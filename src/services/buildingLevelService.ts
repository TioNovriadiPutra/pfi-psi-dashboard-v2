import type { ResType } from "@interfaces/resInterface";
import type {
  BuildingLevelDTO,
  BuildingLevelInput,
} from "@models/buildingLevelModel";
import { API_ENDPOINT } from "@utils/config/api";
import { axiosInstance } from "@utils/config/axios";
import { errorResponse, successResponse } from "@utils/helper/responseHandler";

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
