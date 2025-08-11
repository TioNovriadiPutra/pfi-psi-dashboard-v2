import useHelper from "@hooks/useHelper";
import type { FetchDataType } from "@interfaces/pageInterface";
import useDefectTypeModel from "@models/defectTypeModel";
import { paginationHandler } from "@utils/helper/responseHandler";
import moment from "moment";

const useDefectTypeController = () => {
  const { useGetDefectTypes } = useDefectTypeModel();

  const { onError } = useHelper();

  const useGetDefectTypesService = () => {
    const { data, isLoading, isError, error } = useGetDefectTypes();

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
                { flex: "flex-1", type: "text", label: item.name },
                {
                  flex: "flex-1",
                  type: "text",
                  label: moment(item.created_at).format("ddd, DD MMM YYYY"),
                },
              ],
              functions: [],
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
    useGetDefectTypesService,
  };
};

export default useDefectTypeController;
