import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SidebarProfileSkeleton = () => {
  return (
    <div className="!flex-row items-center py-[12px] pl-[28px] pr-[16px] border-t border-t-neutral-200 gap-[12px]">
      <Skeleton className="!size-[40px] !rounded-full" />

      <div className="flex-1 gap-[2px]">
        <Skeleton count={2} className="!w-full !m-0 !p-0" />
      </div>

      <Skeleton className="!size-lg" />
    </div>
  );
};

export default SidebarProfileSkeleton;
