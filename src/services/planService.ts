import type { ResType } from "@interfaces/resInterface";
import type { PlanDTO, PlanReqInput } from "@models/planModel";
import { API_ENDPOINT } from "@utils/config/api";
import { axiosCloudinaryInstance, axiosInstance } from "@utils/config/axios";
import { errorResponse, successResponse } from "@utils/helper/responseHandler";

export const addPlan = async (
  body: PlanReqInput
): Promise<ResType<PlanDTO>> => {
  try {
    let res1 = null;
    let res2 = null;

    if (body.plan_image && body.plan_image !== "")
      res1 = await axiosCloudinaryInstance.post("/image/upload", {
        file: body.plan_image,
        upload_preset: "pfi-psi-dashboard",
      });

    if (body.plan_evelvation_image && body.plan_evelvation_image !== "")
      res2 = await axiosCloudinaryInstance.post("/image/upload", {
        file: body.plan_evelvation_image,
        upload_preset: "pfi-psi-dashboard",
      });

    const mapBody = {
      ...body,
      plan_image: res1?.data.secure_url ?? null,
      plan_evelvation_image: res2?.data.secure_url ?? null,
    };

    const response = await axiosInstance.post(API_ENDPOINT.addPlan, mapBody);

    return successResponse<PlanDTO>(response, "Plan added!");
  } catch (error) {
    throw errorResponse(error);
  }
};
