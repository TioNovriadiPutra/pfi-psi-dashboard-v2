import type { PaginationType, ResType } from "@interfaces/resInterface";
import type { ProjectDTO, ProjectInput } from "@models/projectModel";
import { API_ENDPOINT } from "@utils/config/api";
import { axiosInstance } from "@utils/config/axios";
import { errorResponse, successResponse } from "@utils/helper/responseHandler";

export const getProjects = async (): Promise<
  ResType<PaginationType<ProjectDTO[]>>
> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINT.getProjects);

    return successResponse<PaginationType<ProjectDTO[]>>(
      response,
      "Data fetched!"
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const getProjectDetail = async (
  name: string
): Promise<ResType<ProjectDTO>> => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINT.addProject}/${encodeURIComponent(name)}`
    );

    return successResponse<ProjectDTO>(response, "Data fetched!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const addProject = async (
  body: ProjectInput
): Promise<ResType<ProjectDTO>> => {
  try {
    const mapBody = {
      ...body,
      status: body.status ? body.status.value : null,
    };

    const response = await axiosInstance.post(API_ENDPOINT.addProject, mapBody);

    return successResponse(response, "Project added!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const updateProject = async (
  name: string,
  body: ProjectInput
): Promise<ResType<{ message: string }>> => {
  try {
    const mapBody = {
      ...body,
      status: Number(body.status),
    };

    const response = await axiosInstance.patch(
      `${API_ENDPOINT.addProject}/${encodeURIComponent(name)}`,
      mapBody
    );

    return successResponse<{ message: string }>(response, "Project updated!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const deleteProject = async (
  name: string
): Promise<ResType<{ message: string }>> => {
  try {
    const response = await axiosInstance.delete(
      `${API_ENDPOINT.addProject}/${encodeURIComponent(name)}`
    );

    return successResponse<{ message: string }>(response, "Project deleted!");
  } catch (error) {
    throw errorResponse(error);
  }
};
