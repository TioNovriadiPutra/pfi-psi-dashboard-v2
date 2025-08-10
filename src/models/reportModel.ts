import useHelper from "@hooks/useHelper";
import type { DropdownType } from "@interfaces/formInterface";
import { deleteReport, getReports } from "@services/reportService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@utils/config/client";

export interface ReportInput {
  report_no: string;
  report_date: string;
  time_inspection: string;
  date_inspection: string;
  duration_inspection: string;
  location_inspection: string;
  methodology_inspection: string;
  name_providers: string;
  facade_inspector: string;
  description?: string;
  highlight?: string;
}

export interface ReportDTO {
  id: number;
  building_id: DropdownType | null;
  report_no: string;
  report_date: string;
  time_inspection: string;
  date_inspection: string;
  duration_inspection: string;
  location_inspection: string;
  methodology_inspection: string;
  name_providers: string;
  facade_inspector: string;
  description?: string;
  highlight?: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  is_deleted: boolean;
}

const useReportModel = () => {
  const { confirmationModal, onMutate, onSettled, onError, onSuccess } =
    useHelper();

  const useGetReports = () =>
    useQuery({
      queryKey: ["getReports"],
      queryFn: () => getReports(),
    });

  const useDeleteReport = () =>
    useMutation({
      mutationKey: ["deleteReport"],
      mutationFn: (reportNo: string) => deleteReport(reportNo),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError: (err) => {
        confirmationModal.hideModal();
        onError(err);
      },
      onSuccess: (res) => {
        confirmationModal.hideModal();
        queryClient.invalidateQueries({ queryKey: ["getReports"] });
        onSuccess(res.message);
      },
    });

  return {
    useGetReports,
    useDeleteReport,
  };
};

export default useReportModel;
