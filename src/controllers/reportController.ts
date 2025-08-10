import useHelper from "@hooks/useHelper";
import type { FetchDataType } from "@interfaces/pageInterface";
import useReportModel from "@models/reportModel";
import { paginationHandler } from "@utils/helper/responseHandler";

const useReportController = () => {
  const { useGetReports } = useReportModel();

  const { onError } = useHelper();

  const useGetReportsService = () => {
    const { data, isLoading, isError, error } = useGetReports();

    let finalData: FetchDataType[][] = [];

    if (!isLoading) {
      if (isError) {
        onError(error);
      } else if (data) {
        finalData = [
          [
            {
              pagination: paginationHandler(
                data.data.page,
                data.data.items_per_page,
                data.data.total_count
              ),
              finalData: data.data.data.map((item) => ({
                id: item.id,
                row: [
                  { type: "text", flex: "flex-1", label: item.name_providers },
                  {
                    type: "text",
                    flex: "flex-1",
                    label: item.methodology_inspection,
                  },
                  {
                    type: "text",
                    flex: "flex-1",
                    label: item.methodology_inspection,
                  },
                  {
                    type: "text",
                    flex: "flex-1",
                    label: item.location_inspection,
                  },
                  {
                    type: "text",
                    flex: "flex-1",
                    label: item.duration_inspection,
                  },
                ],
                functions: [],
              })),
            },
          ],
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
  };
};

export default useReportController;
