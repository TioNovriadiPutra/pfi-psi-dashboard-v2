import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FormSkeleton = () => {
  return (
    <div className="flex-1 items-center">
      <div className="w-full max-w-[712px] h-full">
        <Skeleton
          className="!w-full !h-full"
          containerClassName="!w-full !h-full"
        />
      </div>
    </div>
  );
};

export default FormSkeleton;
