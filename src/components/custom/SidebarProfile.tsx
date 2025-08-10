import type { UserProfileDTO } from "@models/userModel";
import { BiLogOut } from "react-icons/bi";
import { motion } from "motion/react";
import useAuthController from "@controllers/authController";
import { useConfirmationModal } from "@stores/modalStore";

type Props = {
  profileData: UserProfileDTO;
};

const SidebarProfile = ({ profileData }: Props) => {
  const showConfirmationModal = useConfirmationModal(
    (state) => state.showModal
  );

  const { logoutService } = useAuthController();

  return (
    <div className="!flex-row items-center py-[12px] pl-[28px] pr-[16px] border-t border-t-neutral-200 gap-[12px]">
      <img
        src={`${profileData.profile_image_url}`}
        alt="User Profile"
        className="size-[40px] rounded-full"
      />

      <div className="gap-[2px]">
        <p className="text-body-sm font-medium text-neutral-900 truncate">
          {profileData.name}
        </p>

        <p className="text-body-xs font-normal text-neutral-500 truncate">
          {profileData.email}
        </p>
      </div>

      <motion.button
        type="button"
        className="size-lg bg-neutral-0 hover:bg-primary-200 text-neutral-900 hover:text-primary-400 transition-colors duration-300 rounded-md"
        onClick={() =>
          showConfirmationModal({
            title: "Logout",
            description: "Are you sure you want to logout?",
            onConfirm: logoutService,
          })
        }
      >
        <BiLogOut size={16} />
      </motion.button>
    </div>
  );
};

export default SidebarProfile;
