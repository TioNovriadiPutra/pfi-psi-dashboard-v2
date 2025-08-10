import { SearchInput } from "@components/custom";
import type { AppHeaderType } from "@interfaces/pageInterface";
import { BiFilterAlt } from "react-icons/bi";
import Button from "./Button";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router";

type Props = {
  headerData: AppHeaderType;
};

const AppHeader = ({ headerData }: Props) => {
  const nav = useNavigate();

  return (
    <div className="!flex-row items-center justify-between">
      <div className="!flex-row items-center gap-[10px]">
        {headerData.withSearch && <SearchInput />}

        <Button
          buttonData={{
            label: "Filter",
            color: "bg-neutral-0",
            hover: "hover:bg-primary-200",
          }}
          icon={BiFilterAlt}
          size="sm"
        />
      </div>

      {headerData.addLabel && headerData.addDest ? (
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
      ) : null}
    </div>
  );
};

export default AppHeader;
