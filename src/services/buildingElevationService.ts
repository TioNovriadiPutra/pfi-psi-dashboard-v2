import type { ResType } from "@interfaces/resInterface";
import type {
  BuildingElevationDTO,
  BuildingElevationInput,
} from "@models/buildingElevationModel";
import { API_ENDPOINT } from "@utils/config/api";
import { axiosInstance } from "@utils/config/axios";
import { errorResponse, successResponse } from "@utils/helper/responseHandler";

export const addBuildingElevations = async (
  buildingId: number,
  body: BuildingElevationInput
): Promise<ResType<BuildingElevationDTO>> => {
  try {
    const mapBody = {
      ...body,
      building_id: buildingId,
    };

    const response = await axiosInstance.post(
      API_ENDPOINT.addBuildingSide,
      mapBody
    );

    return successResponse<BuildingElevationDTO>(
      response,
      "Building elevation added!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};
