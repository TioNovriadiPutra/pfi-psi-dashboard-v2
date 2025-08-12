import type { ResType } from "@interfaces/resInterface";
import type { DefectDTO, DefectReqInput } from "@models/defectModel";
import { API_ENDPOINT } from "@utils/config/api";
import { axiosCloudinaryInstance, axiosInstance } from "@utils/config/axios";
import { errorResponse, successResponse } from "@utils/helper/responseHandler";
import axios from "axios";

export const addDefect = async (
  body: DefectReqInput[]
): Promise<ResType<DefectDTO>> => {
  try {
    let response: any;

    for (const data of body) {
      let mapBody = {
        ...data,
        defect_type_id: data.defect_type_id?.value ?? null,
      };

      const res1 = await axiosCloudinaryInstance.post("/image/upload", {
        file: mapBody.image_elevation,
        upload_preset: "pfi-psi-dashboard",
      });

      const res2 = await axios.post("/image/upload", {
        file: mapBody.image_detail,
        upload_preset: "pfi-psi-dashboard",
      });

      mapBody = {
        ...mapBody,
        image_elevation: res1.data.secure_url,
        image_detail: res2.data.secure_url,
      };

      response = await axiosInstance.post(API_ENDPOINT.getDefects, mapBody);
    }

    return successResponse<DefectDTO>(response, "Defect added!");
  } catch (error) {
    throw errorResponse(error);
  }
};
