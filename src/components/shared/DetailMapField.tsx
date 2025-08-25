import { MapInputLayer } from "@components/custom";
import ModalContainer from "@containers/ModalContainer";
import useOneMapController from "@controllers/oneMapController";
import type { MapType } from "@interfaces/formInterface";
import Map, { Marker, type MapRef } from "@vis.gl/react-maplibre";
import { Reuleaux } from "ldrs/react";
import "ldrs/react/Reuleaux.css";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FaExclamation } from "react-icons/fa";
import DetailField from "./DetailField";

type Props = {
  label: string;
  value: MapType;
};

const DetailMapField = ({ label, value }: Props) => {
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState({
    lat: 0,
    lng: 0,
    area: "-",
    description: "-",
  });

  const mapRef = useRef<MapRef>(null);

  const { useRetrieveThemeService } = useOneMapController();

  const { finalData, isLoading } = useRetrieveThemeService();

  const onDetail = () => {
    const point = mapRef.current?.project([value.lng, value.lat]);

    const features = mapRef.current?.queryRenderedFeatures(point, {
      layers: finalData.map((_, index) => `theme-fill-${index}`),
    });

    if (features && features.length > 0) {
      const feature = features[0];

      setDetailData({
        lat: value.lat,
        lng: value.lng,
        area: feature.properties.name,
        description: feature.properties.description,
      });
    } else {
      setDetailData({
        lat: value.lat,
        lng: value.lng,
        area: "-",
        description: "-",
      });
    }
  };

  useEffect(() => {
    onDetail();
  }, [finalData]);

  return (
    <div className="w-full gap-[8px]">
      <p className="text-body-sm font-medium text-neutral-900">{label}</p>

      <div className="relative h-[450px] rounded-md overflow-hidden border border-neutral-200">
        <Map
          ref={mapRef}
          initialViewState={{
            latitude: value.lat,
            longitude: value.lng,
            zoom: 9.5,
          }}
          mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${
            import.meta.env.VITE_MAPTILER_KEY
          }`}
          dragRotate={false}
          doubleClickZoom={false}
          touchZoomRotate={false}
          keyboard={false}
          style={{ width: "100%", height: "100%" }}
        >
          {finalData.map((item, index) => (
            <MapInputLayer
              key={index.toString()}
              sourceData={item}
              index={index}
            />
          ))}

          <Marker latitude={value.lat} longitude={value.lng} color="red" />
        </Map>

        <div className="absolute top-xs right-xs gap-[10px]">
          <button
            type="button"
            className="size-[40px] rounded-full bg-primary-500 hover:bg-primary-600 transition-colors duration-300 text-neutral-0"
            style={{ boxShadow: "rgba(13, 26, 38, 0.25) 0px 4px 12px 0px" }}
            onClick={() => setShowDetail(!showDetail)}
          >
            <FaExclamation size={14} />
          </button>

          <AnimatePresence>
            {showDetail && (
              <motion.div
                className="absolute top-[45px] right-0 bg-neutral-0 p-xs rounded-lg w-[400px] origin-top-right gap-xs"
                style={{ boxShadow: "rgba(13, 26, 38, 0.25) 0px 4px 12px 0px" }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <div className="!flex-row gap-xs">
                  <DetailField
                    label="Latitude"
                    value={detailData?.lat.toString() ?? "-"}
                  />

                  <DetailField
                    label="Longitude"
                    value={detailData?.lng.toString() ?? "-"}
                  />
                </div>

                <DetailField label="Area" value={detailData?.area ?? "-"} />

                <DetailField
                  label="Description"
                  value={detailData?.description ?? "-"}
                  isArea
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ModalContainer show={isLoading} withMin={false}>
          <div className="p-md">
            <Reuleaux
              size="36"
              stroke="5"
              strokeLength="0.15"
              bgOpacity="0.1"
              speed="1.2"
              color="#3399aa"
            />
          </div>
        </ModalContainer>
      </div>
    </div>
  );
};

export default DetailMapField;
