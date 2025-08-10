import type { MapType } from "@interfaces/formInterface";
import Map, { Marker } from "@vis.gl/react-maplibre";

type Props = {
  label: string;
  value: MapType;
};

const DetailMapField = ({ label, value }: Props) => {
  return (
    <div className="w-full gap-[8px]">
      <p className="text-body-sm font-medium text-neutral-900">{label}</p>

      <div className="relative h-[450px] rounded-md overflow-hidden border border-neutral-200">
        <Map
          initialViewState={{
            latitude: value.lat,
            longitude: value.lng,
            zoom: 9.5,
          }}
          mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${
            import.meta.env.VITE_MAPTILER_KEY
          }`}
          style={{ width: "100%", height: "100%" }}
        >
          <Marker latitude={value.lat} longitude={value.lng} color="red" />
        </Map>
      </div>
    </div>
  );
};

export default DetailMapField;
