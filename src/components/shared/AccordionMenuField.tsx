import type { DetailAccordionDataStateType } from "@interfaces/stateInterface";
import { easeIn, useAnimate } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Props = {
  menuContent: DetailAccordionDataStateType[];
  isOpen: boolean;
};

const AccordionMenuField = ({ menuContent, isOpen }: Props) => {
  const [menuHeight, setMenuHeight] = useState(0);

  const menuRef = useRef<HTMLDivElement>(null);

  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (menuRef.current) setMenuHeight(menuRef.current.offsetHeight);
  }, [menuRef.current]);

  useEffect(() => {
    if (isOpen && menuHeight > 0) {
      animate(scope.current, { height: menuHeight }, { ease: "easeInOut" });
    } else {
      animate(scope.current, { height: 0 }, { ease: "easeInOut" });
    }
  }, [isOpen, menuHeight]);

  return (
    <div ref={scope} className="overflow-hidden h-0">
      <div ref={menuRef} className="gap-[8px]">
        {menuContent.map((item, index) => (
          <div
            key={index.toString()}
            className={`!flex-row gap-xs px-xs ${
              index === menuContent.length - 1 && "pb-xs"
            }`}
          >
            <p className="flex-1 text-body-xs font-semibold text-neutral-900">
              {item.label}
            </p>

            <p className="text-body-xs font-semibold text-neutral-900">:</p>

            <p className="flex-2 text-body-sm font-normal text-neutral-700">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccordionMenuField;
