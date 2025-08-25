import type { PaginationType, ResType } from "@interfaces/resInterface";
import type {
  BuildingAddDTO,
  BuildingDTO,
  BuildingInput,
} from "@models/buildingModel";
import { API_ENDPOINT } from "@utils/config/api";
import { axiosInstance } from "@utils/config/axios";
import { errorResponse, successResponse } from "@utils/helper/responseHandler";
import {
  addBuildingElevations,
  updateBuildingElevation,
} from "./buildingElevationService";
import {
  addBuildingLevel,
  // updateBuildingLevel
} from "./buildingLevelService";

export const getBuildings = async (): Promise<
  ResType<PaginationType<BuildingAddDTO[]>>
> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINT.getBuildings, {
      skipAuth: true,
    });

    return successResponse<PaginationType<BuildingDTO[]>>(
      response,
      "Data fetched!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const getBuildingDetail = async (
  id: number
): Promise<ResType<BuildingDTO>> => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINT.addBuilding}/${id}`,
      { skipAuth: true }
    );

    return successResponse<BuildingDTO>(response, "Data fetched!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const addBuilding = async (
  body: BuildingInput
): Promise<ResType<BuildingAddDTO>> => {
  try {
    const mapBody = {
      ...body,
      levels_count: body.levels.length,
      sides_count: body.elevations.length,
      building_type: body.building_type?.value ?? null,
      project_id: body.project_id?.value ?? null,
      owner_id: 1,
      latitude: body.location?.lat ?? null,
      longitude: body.location?.lng ?? null,
      status_construction: body.status_construction || 0.0,
      construction_start_date: body.construction_start_date || null,
      construction_end_date: body.construction_end_date || null,
    };

    delete (mapBody as any).elevations;
    delete (mapBody as any).levels;

    const response = await axiosInstance.post(
      API_ENDPOINT.addBuilding,
      mapBody
    );

    for (const elevation of body.elevations) {
      await addBuildingElevations(response.data.id, elevation);
    }

    for (const level of body.levels) {
      await addBuildingLevel(response.data.id, level);
    }

    return successResponse<BuildingAddDTO>(response, "Building added!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const updateBuilding = async (
  id: number,
  body: BuildingInput
): Promise<{ message: string }> => {
  try {
    const mapBody = {
      ...body,
      levels_count: body.levels.length,
      sides_count: body.elevations.length,
      building_type: body.building_type?.value ?? null,
      project_id: body.project_id?.value ?? null,
      owner_id: 1,
      latitude: body.location?.lat ?? null,
      longitude: body.location?.lng ?? null,
    };

    delete (mapBody as any).elevations;
    delete (mapBody as any).levels;

    const response = await axiosInstance.patch(
      `${API_ENDPOINT.addBuilding}/${body.name}`,
      mapBody
    );

    for (const elevation of body.elevations) {
      await updateBuildingElevation(id, elevation);
    }

    // for (const level of body.levels) {
    //   await updateBuildingLevel(id, level);
    // }

    return successResponse<{ message: string }>(response, "Building updated!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const deleteBuilding = async (
  name: string
): Promise<ResType<{ message: string }>> => {
  try {
    const response = await axiosInstance.delete(
      `${API_ENDPOINT.addBuilding}/${encodeURIComponent(name)}`
    );

    return successResponse<{ message: string }>(response, "Building deleted!");
  } catch (error) {
    throw errorResponse(error);
  }
};
