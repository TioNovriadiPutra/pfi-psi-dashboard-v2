import useHelper from "@hooks/useHelper";
import type { FetchDataType } from "@interfaces/pageInterface";
import useReportModel from "@models/reportModel";
import { paginationHandler } from "@utils/helper/responseHandler";
import moment from "moment";

const useReportController = () => {
  const { useGetReports, useAddReport, useDeleteReport } = useReportModel();

  const { confirmationModal, onError } = useHelper();

  const addReportMutation = useAddReport();
  const deleteReportMutation = useDeleteReport();

  const useGetReportsService = () => {
    const { data, isLoading, isError, error } = useGetReports();

    let finalData: FetchDataType[] = [];

    if (!isLoading) {
      if (isError) {
        onError(error);
      } else if (data) {
        finalData = [
          {
            pagination: paginationHandler(
              data.data.page,
              data.data.items_per_page,
              data.data.total_count
            ),
            finalData: data.data.data.map((item) => ({
              id: item.id,
              row: [
                { type: "text", flex: "flex-1", label: item.report_no },
                {
                  type: "text",
                  flex: "flex-1",
                  label: moment(item.report_date).format("ddd, DD MMM YYYY"),
                },
                {
                  type: "text",
                  flex: "flex-1",
                  label: moment(item.date_inspection).format(
                    "ddd, DD MMM YYYY"
                  ),
                },
                { type: "text", flex: "flex-1", label: item.time_inspection },
                {
                  type: "text",
                  flex: "flex-1",
                  label: `${item.duration_inspection} minutes`,
                },
                {
                  type: "text",
                  flex: "flex-1",
                  label: item.location_inspection,
                },
                {
                  type: "text",
                  flex: "flex-1",
                  label: item.methodology_inspection,
                },
                { type: "text", flex: "flex-1", label: item.name_providers },
                { type: "text", flex: "flex-1", label: item.facade_inspector },
                {
                  type: "text",
                  flex: "flex-2",
                  label: item.description ?? "-",
                },
                {
                  type: "text",
                  flex: "flex-1",
                  label: item.highlight ?? "-",
                },
              ],
              functions: [
                {
                  type: "delete",
                  onClick: () =>
                    confirmationModal.showModal({
                      title: "Delete Project",
                      description: `Are you sure you want to delete |"${item.report_no}"| report? This action cannot be undo!`,
                      onConfirm: () =>
                        deleteReportMutation.mutate(item.report_no),
                    }),
                },
              ],
            })),
          },
        ];
      }
    }

    return {
      finalData,
      isLoading,
    };
  };

  return {
    useGetReportsService,
    addReportService: (body: any) => addReportMutation.mutate(body),
  };
};

export default useReportController;
