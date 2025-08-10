import type { DropdownType } from "@interfaces/formInterface";
import { getReports } from "@services/reportService";
import { useQuery } from "@tanstack/react-query";

export interface ReportInput {
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
  const useGetReports = () =>
    useQuery({
      queryKey: ["getReports"],
      queryFn: () => getReports(),
    });

  return {
    useGetReports,
  };
};

export default useReportModel;
