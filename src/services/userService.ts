import type { ResType } from "@interfaces/resInterface";
import type { UserProfileDTO } from "@models/userModel";
import { API_ENDPOINT } from "@utils/config/api";
import { axiosInstance } from "@utils/config/axios";
import { errorResponse, successResponse } from "@utils/helper/responseHandler";

export const getUserProfile = async (
  username: string
): Promise<ResType<UserProfileDTO>> => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINT.register}/${encodeURIComponent(username)}`,
      { skipAuth: true }
    );

    return successResponse<UserProfileDTO>(response, "Data fetched!");
  } catch (error) {
    throw errorResponse(error);
  }
};
