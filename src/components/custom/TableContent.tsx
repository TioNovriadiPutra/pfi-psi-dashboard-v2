import type { FetchFinalDataType } from "@interfaces/pageInterface";
import TableRow from "./TableRow";
import { useState } from "react";

type Props = {
  contentData: FetchFinalDataType[];
};

const TableContent = ({ contentData }: Props) => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const onOpenMenu = (index: number) => {
    if (activeMenu === index) {
      setActiveMenu(null);
    } else {
      setActiveMenu(index);
    }
  };

  return (
    <div className="flex-1">
      {contentData.map((item, index) => (
        <TableRow
          key={index.toString()}
          rowData={item.row}
          funcData={item.functions}
          isMenuActive={activeMenu === index}
          onOpen={() => onOpenMenu(index)}
        />
      ))}
    </div>
  );
};

export default TableContent;
