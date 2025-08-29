import { SearchInput } from "@components/custom";
import type { AppHeaderType } from "@interfaces/pageInterface";
import { BiFilterAlt } from "react-icons/bi";
import Button from "./Button";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router";
import useResponsive from "@hooks/useResponsive";

type Props = {
  headerData: AppHeaderType;
};

const AppHeader = ({ headerData }: Props) => {
  const nav = useNavigate();

  const { isTablet } = useResponsive();

  return (
    <div className="lg:!flex-row lg:items-center lg:justify-between gap-xs">
      <div className="!flex-row items-center gap-[10px]">
        {headerData.withSearch && <SearchInput />}

        {isTablet ? (
          <button
            type="button"
            className="px-[12px] py-[7px] border border-neutral-200 hover:border-primary-200 rounded-md bg-neutral-0 hover:bg-primary-200 text-neutral-900 hover:text-primary-400 transition-colors duration-300"
          >
            <BiFilterAlt size={18} />
          </button>
        ) : (
          <Button
            buttonData={{
              label: "Filter",
              color: "bg-neutral-0",
              hover: "hover:bg-primary-200",
            }}
            icon={BiFilterAlt}
            size="sm"
          />
        )}
      </div>

      {headerData.addLabel && headerData.addDest ? (
        <div className="!flex-row self-end">
          <Button
            buttonData={{
              label: headerData.addLabel,
              color: "bg-primary-500",
              hover: "hover:bg-primary-600",
            }}
            icon={IoIosAddCircleOutline}
            size="sm"
            onClick={() => nav(headerData.addDest!)}
          />
        </div>
      ) : null}
    </div>
  );
};

export default AppHeader;
