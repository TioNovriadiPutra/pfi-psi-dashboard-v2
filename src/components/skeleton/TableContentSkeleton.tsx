import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TableContentSkeleton = () => {
  return (
    <div>
      <Skeleton count={10} className="h-[56px] w-full" />
    </div>
  );
};

export default TableContentSkeleton;
