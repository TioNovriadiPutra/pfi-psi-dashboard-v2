import { DetailField } from "@components/shared";
import type { MapType } from "@interfaces/formInterface";
import { useOneTheme } from "@stores/pageStore";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { MdFilterAlt, MdMenu } from "react-icons/md";
import Switch from "react-switch";

type Props = {
  detailData?: MapType;
  show: boolean;
  onClick: () => void;
};

const MapInputDetail = ({ detailData, show, onClick }: Props) => {
  const [showFilter, setShowFilter] = useState(false);

  const oneTheme = useOneTheme();

  return (
    <div className="absolute top-xs right-xs gap-[10px]">
      <button
        type="button"
        className="size-[40px] rounded-full bg-primary-500 hover:bg-primary-600 transition-colors duration-300 text-neutral-0"
        style={{ boxShadow: "rgba(13, 26, 38, 0.25) 0px 4px 12px 0px" }}
        onClick={onClick}
      >
        <MdMenu size={24} />
      </button>

      <button
        type="button"
        className="size-[40px] rounded-full bg-primary-500 hover:bg-primary-600 transition-colors duration-300 text-neutral-0"
        style={{ boxShadow: "rgba(13, 26, 38, 0.25) 0px 4px 12px 0px" }}
        onClick={() => setShowFilter(!showFilter)}
      >
        <MdFilterAlt size={24} />
      </button>

      <AnimatePresence>
        {show && (
          <motion.div
            className="absolute top-[45px] right-0 bg-neutral-0 p-xs rounded-lg w-[400px] origin-top-right"
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

      <AnimatePresence>
        {showFilter && (
          <motion.div
            className="absolute top-[95px] right-0 z-[999] bg-neutral-0 p-xs rounded-lg w-[400px] origin-top-right gap-xs"
            style={{ boxShadow: "rgba(13, 26, 38, 0.25) 0px 4px 12px 0px" }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            {oneTheme.data.map((item, index) => (
              <div
                key={index.toString()}
                className="!flex-row items-center gap-sm"
              >
                <p className="flex-1 text-body-sm font-normal text-neutral-900">
                  {item.label}
                </p>

                <Switch
                  onChange={() => oneTheme.onClick(item.value)}
                  checked={item.active}
                  height={24}
                  handleDiameter={18}
                />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapInputDetail;
