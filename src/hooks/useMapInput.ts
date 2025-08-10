import useOneMapController from "@controllers/oneMapController";
import type { InputType } from "@interfaces/formInterface";
import type { MapLayerMouseEvent, MapRef } from "@vis.gl/react-maplibre";
import { useRef, useState } from "react";
import { useController, type Control } from "react-hook-form";

const useMapInput = (inputData: InputType, control: Control<any, any>) => {
  const [showDetail, setShowDetail] = useState(false);

  const mapRef = useRef<MapRef>(null);

  const { useRetrieveThemeService } = useOneMapController();

  const retrieveTheme = useRetrieveThemeService();

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

  return {
    showDetail,
    mapRef,
    retrieveTheme,
    field,
    error,
    onDetail,
    onHideDetail,
    onMark,
  };
};

export default useMapInput;
