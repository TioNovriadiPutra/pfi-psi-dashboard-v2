import { useSidebar } from "@stores/pageStore";
import { RxHamburgerMenu } from "react-icons/rx";

const LayoutHeader = () => {
  const showSidebar = useSidebar((state) => state.showLoading);

  return (
    <div className="!flex-row items-center justify-between h-[60px] bg-neutral-0 border-b border-b-neutral-200 px-[16px]">
      <button
        type="button"
        className="size-[40px] items-center justify-center border border-neutral-200 rounded-md bg-neutral-0 hover:bg-primary-200 text-neutral-900 hover:text-primary-400 transition-colors duration-300"
        onClick={showSidebar}
      >
        <RxHamburgerMenu size={20} />
      </button>

      <img src="/logo.svg" alt="MaxzRange" className="size-xl" />

      <img
        src={"https://i.pravatar.cc/150?img=3"}
        alt="User Profile"
        className="size-[40px] rounded-full"
      />
    </div>
  );
};

export default LayoutHeader;
