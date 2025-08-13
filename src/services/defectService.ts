import type { ResType } from "@interfaces/resInterface";
import type { DefectDTO, DefectReqInput } from "@models/defectModel";
import { API_ENDPOINT } from "@utils/config/api";
import { axiosCloudinaryInstance, axiosInstance } from "@utils/config/axios";
import { errorResponse, successResponse } from "@utils/helper/responseHandler";
import { addInspection } from "./inspectionService";

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

      const res2 = await axiosCloudinaryInstance.post("/image/upload", {
        file: mapBody.image_detail,
        upload_preset: "pfi-psi-dashboard",
      });

      mapBody = {
        ...mapBody,
        image_elevation: res1.data.secure_url,
        image_detail: res2.data.secure_url,
      };

      response = await axiosInstance.post(API_ENDPOINT.getDefects, mapBody);

      for (const data2 of mapBody.defect_levels) {
        let res3 = null;
        let res4 = null;

        if (data2.image_elevation && data2.image_elevation !== "")
          res3 = await axiosCloudinaryInstance.post("/image/upload", {
            file: data2.image_elevation,
            upload_preset: "pfi-psi-dashboard",
          });

        if (data2.image_defect && data2.image_defect !== "")
          res4 = await axiosCloudinaryInstance.post("/image/upload", {
            file: data2.image_defect,
            upload_preset: "pfi-psi-dashboard",
          });

        const res5 = await axiosCloudinaryInstance.post("/image/upload", {
          file: data2.photograph,
          upload_preset: "pfi-psi-dashboard",
        });

        const mapBody2 = {
          ...data2,
          photograph: res5.data.secure_url,
          image_elevation: res3?.data.secure_url ?? null,
          image_defect: res4?.data.secure_url ?? null,
        };

        await addInspection(mapBody2);
      }
    }

    return successResponse<DefectDTO>(response, "Defect added!");
  } catch (error) {
    throw errorResponse(error);
  }
};
