import type { ResType } from "@interfaces/resInterface";
import type { InspectionDTO, InspectionInput } from "@models/inspectionModel";
import { API_ENDPOINT } from "@utils/config/api";
import { axiosCloudinaryInstance, axiosInstance } from "@utils/config/axios";
import { errorResponse, successResponse } from "@utils/helper/responseHandler";

export const addInspection = async (
  body: InspectionInput
): Promise<ResType<InspectionDTO>> => {
  try {
    let res1 = null;
    let res2 = null;

    if (body.image_elevation && body.image_elevation !== "")
      res1 = await axiosCloudinaryInstance.post("/image/upload", {
        file: body.image_elevation,
        upload_preset: "pfi-psi-dashboard",
      });

    if (body.image_defect && body.image_defect !== "")
      res2 = await axiosCloudinaryInstance.post("/image/upload", {
        file: body.image_defect,
        upload_preset: "pfi-psi-dashboard",
      });

    const res3 = await axiosCloudinaryInstance.post("/image/upload", {
      file: body.photograph,
      upload_preset: "pfi-psi-dashboard",
    });

    const mapBody = {
      ...body,
      photograph: res3.data.secure_url,
      image_elevation: res1?.data.secure_url ?? null,
      image_defect: res2?.data.secure_url ?? null,
      level_id: body.level_id?.value ?? null,
    };

    const response = await axiosInstance.post(
      API_ENDPOINT.addInspection,
      mapBody
    );

    return successResponse<InspectionDTO>(response, "Inspection added!");
  } catch (error) {
    throw errorResponse(error);
  }
};
