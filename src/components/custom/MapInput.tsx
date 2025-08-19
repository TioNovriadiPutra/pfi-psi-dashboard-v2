import type { InputType } from "@interfaces/formInterface";
import { type Control } from "react-hook-form";
import { Map, Marker } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import ModalContainer from "@containers/ModalContainer";
import { Reuleaux } from "ldrs/react";
import "ldrs/react/Reuleaux.css";
import MapInputLayer from "./MapInputLayer";
import useMapInput from "@hooks/useMapInput";
import MapInputDetail from "./MapInputDetail";
import { AnimatePresence, motion } from "motion/react";
import SearchInput from "./SearchInput";

type Props = {
  inputData: InputType;
  control: Control<any, any>;
};

const MapInput = ({ inputData, control }: Props) => {
  const {
    showDetail,
    mapRef,
    retrieveTheme,
    searchAddress,
    field,
    error,
    onDetail,
    onMark,
    onSearch,
    onSelect,
  } = useMapInput(inputData, control);

  return (
    <div className="relative gap-[8px]">
      {inputData.label && (
        <p className="text-body-sm font-medium text-neutral-900">
          {inputData.label}

          {inputData.required && <span className="text-red-600"> *</span>}
        </p>
      )}

      <SearchInput
        suggestions={searchAddress.finalData}
        isLoading={searchAddress.isLoading}
        onSearch={onSearch}
        onSelect={onSelect}
      />

      <div
        className={`relative h-[450px] rounded-md overflow-hidden border ${
          error ? "border-red-600" : "border-neutral-200"
        }`}
      >
        <Map
          ref={mapRef}
          initialViewState={{
            latitude: field.value?.lat ?? 1.3521,
            longitude: field.value?.lng ?? 103.8198,
            zoom: 9.5,
          }}
          mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${
            import.meta.env.VITE_MAPTILER_KEY
          }`}
          style={{ width: "100%", height: "100%" }}
          onClick={onMark}
        >
          {retrieveTheme.finalData.map((item, index) => (
            <MapInputLayer
              key={index.toString()}
              sourceData={item}
              index={index}
            />
          ))}

          {field.value && (
            <Marker
              latitude={field.value.lat}
              longitude={field.value.lng}
              color="red"
            />
          )}
        </Map>

        <MapInputDetail
          detailData={field.value}
          show={showDetail}
          onClick={onDetail}
        />

        <ModalContainer show={retrieveTheme.isLoading} withMin={false}>
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

      <AnimatePresence>
        {error && (
          <motion.p
            className="absolute bottom-[-20px] text-body-sm font-normal text-red-600"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapInput;
