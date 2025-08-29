import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TableContentSkeleton = () => {
  return (
    <div className="flex-1">
      <Skeleton count={10} className="h-[56px] w-full !rounded-none" />
    </div>
  );
};

export default TableContentSkeleton;
