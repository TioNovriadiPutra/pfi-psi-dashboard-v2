import { retrieveTheme } from "@services/oneMapService";
import { useOneTheme } from "@stores/pageStore";
import { useQuery } from "@tanstack/react-query";

export interface LoginOneMapDTO {
  access_token: string;
  expiry_timestamp: string;
}

export interface GeometryDTO {
  type: string;
  coordinates: number[][][];
}

export interface GeoJSONDTO {
  type: string;
  properties: any;
  geometry: GeometryDTO;
}

export interface ThemeDataDTO {
  NAME: string;
  DESCRIPTION: string;
  HYPERLINK: string;
  CASE_SIZE: string;
  MAPTIP: string;
  SYMBOLCOLOR: string;
  Type: string;
  LatLng: number[][];
  GeoJSON: GeoJSONDTO;
}

export interface ThemeDTO {
  noColor: boolean;
  data: ThemeDataDTO[];
}

const useOneMapModel = () => {
  const oneTheme = useOneTheme((state) => state.data);

  const useRetrieveTheme = () =>
    useQuery({
      queryKey: ["retrieveTheme", oneTheme],
      queryFn: () =>
        retrieveTheme(
          oneTheme.filter((item) => item.active).map((item) => item.value)
        ),
    });

  return {
    useRetrieveTheme,
  };
};

export default useOneMapModel;
