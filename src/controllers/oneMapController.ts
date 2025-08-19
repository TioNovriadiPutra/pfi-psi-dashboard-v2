import type { SuggestionType } from "@interfaces/formInterface";
import useOneMapModel from "@models/oneMapModel";

const useOneMapController = () => {
  const { useRetrieveTheme, useSearchAddress } = useOneMapModel();

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

  const useSearchAddressService = () => {
    const { data, isLoading } = useSearchAddress();

    let finalData: SuggestionType[] = [];

    if (!isLoading && data) {
      finalData = data.results.map(
        (item) =>
          ({
            label: item.BUILDING,
            value: `${item.LATITUDE}|${item.LONGITUDE}`,
            description: item.ADDRESS,
          } as SuggestionType)
      );
    }

    return {
      finalData,
      isLoading,
    };
  };

  return {
    useRetrieveThemeService,
    useSearchAddressService,
  };
};

export default useOneMapController;
