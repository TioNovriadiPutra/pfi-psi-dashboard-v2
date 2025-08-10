import useOneMapModel from "@models/oneMapModel";

const useOneMapController = () => {
  const { useRetrieveTheme } = useOneMapModel();

  const useRetrieveThemeService = () => {
    const { data, isLoading } = useRetrieveTheme();

    let finalData: any[] = [];

    if (!isLoading && data) {
      finalData = data.map((item) => ({
        noColor: item.noColor,
        data: {
          type: "FeatureCollection",
          features: item.data
            .filter((result) => result.GeoJSON && result.GeoJSON.geometry)
            .map((item) => ({
              type: "Feature",
              geometry: item.GeoJSON.geometry,
              properties: {
                name: item.NAME,
                description: item.DESCRIPTION,
                type: item.Type,
              },
            })),
        },
      }));
    }

    return {
      finalData,
      isLoading,
    };
  };

  return {
    useRetrieveThemeService,
  };
};

export default useOneMapController;
