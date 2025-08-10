import type { FetchPaginationType } from "@interfaces/pageInterface";
import type { ResType } from "@interfaces/resInterface";
import type { AxiosError, AxiosResponse } from "axios";

export const successResponse = <T>(
  res: AxiosResponse<T, any>,
  message: string
): ResType<T> => ({
  status: res.status,
  message,
  data: res.data,
});

export const errorResponse = (error: any): ResType => {
  const axiosError = error as AxiosError<any, any>;

  return {
    status: axiosError.response?.status ?? 999,
    message:
      axiosError.response && axiosError.response.data
        ? axiosError.status === 422 &&
          Array.isArray(axiosError.response.data.detail)
          ? "Validation Error"
          : axiosError.response.data.detail
        : "Internal Server Error",
    data: axiosError.response?.data,
  };
};

export const paginationHandler = (
  page: number,
  perPage: number,
  total: number
): FetchPaginationType => {
  return {
    from: (page - 1) * perPage + 1,
    to: Math.min(page * perPage, total),
    total: total,
  };
};
