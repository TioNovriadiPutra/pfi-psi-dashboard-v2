import type { ResType } from "@interfaces/resInterface";
import type { AppendixDTO, AppendixReqInput } from "@models/appendixModel";
import { API_ENDPOINT } from "@utils/config/api";
import { axiosCloudinaryInstance, axiosInstance } from "@utils/config/axios";
import { errorResponse, successResponse } from "@utils/helper/responseHandler";

export const addAppendix = async (
  body: AppendixReqInput
): Promise<ResType<AppendixDTO>> => {
  try {
    const urls = [];

    for (const image of body.image_appendix) {
      const url = await axiosCloudinaryInstance.post("/image/upload", {
        file: image,
        upload_preset: "pfi-psi-dashboard",
      });

      urls.push(url.data.secure_url);
    }

    const mapBody = {
      ...body,
      image_appendix: urls,
    };

    const response = await axiosInstance.post(
      API_ENDPOINT.addAppendix,
      mapBody
    );

    return successResponse<AppendixDTO>(response, "Appendix added!");
  } catch (error) {
    throw errorResponse(error);
  }
};
