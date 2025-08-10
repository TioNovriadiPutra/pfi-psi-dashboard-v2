import type { ResType } from "@interfaces/resInterface";
import type {
  LoginDTO,
  LoginInput,
  RefreshDTO,
  RegisterDTO,
  RegisterInput,
} from "@models/authModel";
import { API_ENDPOINT } from "@utils/config/api";
import { axiosInstance } from "@utils/config/axios";
import { errorResponse, successResponse } from "@utils/helper/responseHandler";

export const register = async (
  body: RegisterInput
): Promise<ResType<RegisterDTO>> => {
  try {
    const mapBody: Omit<RegisterInput, "password_confirmation"> = {
      name: body.name,
      username: body.username,
      email: body.email,
      password: body.password,
    };

    const response = await axiosInstance.post(API_ENDPOINT.register, mapBody, {
      skipAuth: true,
    });

    return successResponse<RegisterDTO>(response, "Registration success!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const login = async (body: LoginInput): Promise<ResType<LoginDTO>> => {
  try {
    const response = await axiosInstance.post(API_ENDPOINT.login, body, {
      skipAuth: true,
    });

    return successResponse<LoginDTO>(response, "Login success!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const logout = async (): Promise<ResType<{ message: string }>> => {
  try {
    const response = await axiosInstance.post(API_ENDPOINT.logout, {});

    return successResponse<{ message: string }>(response, "Logout success!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const refresh = async (): Promise<ResType<RefreshDTO>> => {
  try {
    const response = await axiosInstance.post(API_ENDPOINT.refresh, {});

    return successResponse<RefreshDTO>(response, "Refresh success!");
  } catch (error) {
    throw errorResponse(error);
  }
};
