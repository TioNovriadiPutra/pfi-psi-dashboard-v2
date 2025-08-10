import type {
  LoginOneMapDTO,
  ThemeDataDTO,
  ThemeDTO,
} from "@models/oneMapModel";
import { ONE_API_ENDPOINT } from "@utils/config/api";
import { axiosOneInstance } from "@utils/config/axios";
import { errorResponse } from "@utils/helper/responseHandler";

export const loginOneMap = async (): Promise<LoginOneMapDTO> => {
  try {
    const response = await axiosOneInstance.post(ONE_API_ENDPOINT.login, {
      email: import.meta.env.VITE_ONE_MAP_EMAIL,
      password: import.meta.env.VITE_ONE_MAP_PASS,
    });

    return response.data as LoginOneMapDTO;
  } catch (error) {
    throw errorResponse(error);
  }
};

export const retrieveTheme = async (params: string[]): Promise<ThemeDTO[]> => {
  try {
    const resLogin = await loginOneMap();

    const resultData: ThemeDTO[] = [];

    for (const param of params) {
      const response = await axiosOneInstance.get(
        `${ONE_API_ENDPOINT.theme}?queryName=${param}`,
        {
          headers: {
            Authorization: `Bearer ${resLogin.access_token}`,
          },
        }
      );

      const newData = response.data.SrchResults.slice(1) as ThemeDataDTO[];

      resultData.push({
        noColor: param === "tra_poly",
        data: newData,
      });
    }

    return resultData;
  } catch (error) {
    throw errorResponse(error);
  }
};
