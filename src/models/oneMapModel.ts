import { retrieveTheme, searchAddress } from "@services/oneMapService";
import { useOneTheme, useSearchMap } from "@stores/pageStore";
import { useQuery } from "@tanstack/react-query";

export interface LoginOneMapDTO {
  access_token: string;
  expiry_timestamp: string;
}

export interface AddressDTO {
  SEARCHVAL: string;
  BLK_NO: string;
  ROAD_NAME: string;
  BUILDING: string;
  ADDRESS: string;
  POSTAL: string;
  X: string;
  Y: string;
  LATITUDE: string;
  LONGITUDE: string;
}

export interface SearchAddressDTO {
  found: number;
  totalNumPages: number;
  pageNum: number;
  results: AddressDTO[];
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
  const search = useSearchMap((state) => state.value);

  const useRetrieveTheme = () =>
    useQuery({
      queryKey: ["retrieveTheme", oneTheme],
      queryFn: () =>
        retrieveTheme(
          oneTheme.filter((item) => item.active).map((item) => item.value)
        ),
    });

  const useSearchAddress = () =>
    useQuery({
      queryKey: ["searchAddress", search],
      queryFn: () => searchAddress(search),
    });

  return {
    useRetrieveTheme,
    useSearchAddress,
  };
};

export default useOneMapModel;
