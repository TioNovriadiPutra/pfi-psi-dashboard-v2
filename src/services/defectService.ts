import type { ResType } from "@interfaces/resInterface";
import type { DefectAllReqInput, DefectDTO } from "@models/defectModel";
import { API_ENDPOINT } from "@utils/config/api";
import { axiosCloudinaryInstance, axiosInstance } from "@utils/config/axios";
import { errorResponse, successResponse } from "@utils/helper/responseHandler";
import { addInspection } from "./inspectionService";
import { addReport } from "./reportService";
import { addPlan } from "./planService";

export const addDefect = async (
  body: DefectAllReqInput
): Promise<ResType<DefectDTO>> => {
  try {
    let response: any;

    /* Add Report */
    const response1 = await addReport(body.report);

    /* Add Plans */
    for (const plan of body.plans) {
      const mapBody = {
        ...plan,
        report_id: response1.data.id,
      };

      await addPlan(mapBody);
    }

    /* Add Defects */
    for (const data of body.defects) {
      const res1 = await axiosCloudinaryInstance.post("/image/upload", {
        file: data.image_elevation,
        upload_preset: "pfi-psi-dashboard",
      });

      const mapBody = {
        ...data,
        image_elevation: res1.data.secure_url,
      };

      response = await axiosInstance.post(API_ENDPOINT.getDefects, mapBody);

      /* Add Inspections */
      for (const level of mapBody.defect_levels) {
        const mapBody = {
          ...level,
          report_id: response1.data.id,
        };

        await addInspection(mapBody);
      }
    }

    return successResponse<DefectDTO>(response, "Defect added!");
  } catch (error) {
    throw errorResponse(error);
  }
};
