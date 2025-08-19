import useOneMapController from "@controllers/oneMapController";
import type { InputType, SuggestionType } from "@interfaces/formInterface";
import { useSearchMap } from "@stores/pageStore";
import type { MapLayerMouseEvent, MapRef } from "@vis.gl/react-maplibre";
import { useCallback, useRef, useState } from "react";
import { useController, type Control } from "react-hook-form";
import debounce from "lodash.debounce";

const useMapInput = (inputData: InputType, control: Control<any, any>) => {
  const [showDetail, setShowDetail] = useState(false);

  const searchMap = useSearchMap();

  const mapRef = useRef<MapRef>(null);

  const { useRetrieveThemeService, useSearchAddressService } =
    useOneMapController();

  const retrieveTheme = useRetrieveThemeService();
  const searchAddress = useSearchAddressService();

  const {
    field,
    fieldState: { error },
  } = useController({
    name: inputData.name,
    control,
    rules: inputData.rules,
  });

  const onDetail = () => setShowDetail(!showDetail);

  const onHideDetail = () => setShowDetail(false);

  const onFly = (lng: number, lat: number) => {
    const map = mapRef.current?.getMap();

    map?.flyTo({
      center: [lng, lat],
      zoom: 15,
      essential: true,
    });

    field.onChange({
      lat: lat,
      lng: lng,
      area: "-",
      description: "-",
    });
  };

  const onSearch = useCallback(
    debounce((value) => {
      if (value) {
        searchMap.changeSearch(value);
      } else {
        searchMap.resetSearch();
      }
    }, 500),
    []
  );

  const onMark = (e: MapLayerMouseEvent) => {
    const location = e.lngLat;

    onFly(location.lng, location.lat);

    const features = mapRef.current?.queryRenderedFeatures(e.point, {
      layers: retrieveTheme.finalData.map((_, index) => `theme-fill-${index}`),
    });

    if (features && features?.length > 0) {
      const feature = features[0];

      field.onChange({
        lat: location.lat,
        lng: location.lng,
        area: feature.properties.name,
        description: feature.properties.description,
      });
    } else {
      field.onChange({
        lat: location.lat,
        lng: location.lng,
        area: "-",
        description: "-",
      });
    }

    setShowDetail(true);
  };

  const onSelect = (data: SuggestionType) => {
    const location = (data.value as string).split("|");

    onFly(Number(location[1]), Number(location[0]));

    const point = mapRef.current?.project([
      Number(location[1]),
      Number(location[0]),
    ]);

    const features = mapRef.current?.queryRenderedFeatures(point, {
      layers: retrieveTheme.finalData.map((_, index) => `theme-fill-${index}`),
    });

    if (features && features?.length > 0) {
      const feature = features[0];

      field.onChange({
        lat: location[0],
        lng: location[1],
        area: feature.properties.name,
        description: feature.properties.description,
      });
    } else {
      field.onChange({
        lat: location[0],
        lng: location[1],
        area: "-",
        description: "-",
      });
    }

    setShowDetail(true);
  };

  return {
    showDetail,
    mapRef,
    retrieveTheme,
    searchAddress,
    field,
    error,
    onDetail,
    onHideDetail,
    onMark,
    onSearch,
    onSelect,
  };
};

export default useMapInput;
