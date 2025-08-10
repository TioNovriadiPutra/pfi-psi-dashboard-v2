import { sidebarData } from "@utils/constant/pageConst";
import SidebarButton from "./SidebarButton";
import { SidebarProfileSkeleton } from "@components/skeleton";
import useUserController from "@controllers/userController";
import SidebarProfile from "./SidebarProfile";

const Sidebar = () => {
  const { useGetUserProfileService } = useUserController();

  const { finalData, isLoading } = useGetUserProfileService();

  return (
    <div className="w-[260px] bg-neutral-0 border-r border-r-neutral-200">
      <div className="!flex-row items-start px-md py-[16px] gap-[10px] border-b border-b-neutral-200">
        <img src="/logo.svg" alt="MaxzRange" className="size-md" />

        <h1>MaxZRange</h1>
      </div>

      <div className="flex-1 px-sm py-[8px] gap-[16px]">
        {sidebarData.map((item, index) => (
          <div
            key={index.toString()}
            className={`${
              index < sidebarData.length - 1 &&
              "border-b border-b-neutral-200 border-dashed pb-[16px]"
            }`}
          >
            {item.map((item2, index2) => (
              <SidebarButton key={index2.toString()} buttonData={item2} />
            ))}
          </div>
        ))}
      </div>

      {isLoading ? (
        <SidebarProfileSkeleton />
      ) : (
        <SidebarProfile profileData={finalData} />
      )}
    </div>
  );
};

export default Sidebar;
