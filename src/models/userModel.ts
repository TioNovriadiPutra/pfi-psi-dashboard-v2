import useHelper from "@hooks/useHelper";
import { getUserProfile } from "@services/userService";
import { useQuery } from "@tanstack/react-query";

export interface UserProfileDTO {
  id: number;
  name: string;
  username: string;
  email: string;
  profile_image_url: string;
  tier_id: number | null;
}

const useUserModel = () => {
  const { auth } = useHelper();

  const useGetUserProfile = () =>
    useQuery({
      queryKey: ["getUserProfile"],
      queryFn: () => getUserProfile(auth.username),
    });

  return {
    useGetUserProfile,
  };
};

export default useUserModel;
