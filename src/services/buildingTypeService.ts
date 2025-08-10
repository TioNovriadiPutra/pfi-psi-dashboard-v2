import type { PaginationType, ResType } from "@interfaces/resInterface";
import type {
  BuildingTypeDTO,
  BuildingTypeInput,
} from "@models/buildingTypeModel";
import { API_ENDPOINT } from "@utils/config/api";
import { axiosInstance } from "@utils/config/axios";
import { errorResponse, successResponse } from "@utils/helper/responseHandler";

export const getBuildingTypes = async (): Promise<
  ResType<PaginationType<BuildingTypeDTO[]>>
> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINT.getBuildingTypes, {
      skipAuth: true,
    });

    return successResponse<PaginationType<BuildingTypeDTO[]>>(
      response,
      "Data fetched!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const getBuildingTypeDetail = async (
  name: string
): Promise<ResType<BuildingTypeDTO>> => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINT.addBuildingType}/${encodeURIComponent(name)}`,
      { skipAuth: true }
    );

    return successResponse<BuildingTypeDTO>(response, "Data fetched!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const addBuildingType = async (
  body: BuildingTypeInput
): Promise<ResType<BuildingTypeDTO>> => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINT.addBuildingType,
      body
    );

    return successResponse<BuildingTypeDTO>(response, "Building type added!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const updateBuildingType = async (
  name: string,
  body: BuildingTypeInput
): Promise<ResType<{ message: string }>> => {
  try {
    const response = await axiosInstance.patch(
      `${API_ENDPOINT.addBuildingType}/${encodeURIComponent(name)}`,
      body
    );

    return successResponse<{ message: string }>(
      response,
      "Building type updated!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const deleteBuildingType = async (
  name: string
): Promise<ResType<{ message: string }>> => {
  try {
    const response = await axiosInstance.delete(
      `${API_ENDPOINT.addBuildingType}/${encodeURIComponent(name)}`
    );

    return successResponse<{ message: string }>(
      response,
      "Building type deleted!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};
