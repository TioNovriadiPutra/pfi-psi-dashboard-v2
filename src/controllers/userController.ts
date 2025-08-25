import useHelper from "@hooks/useHelper";
import useUserModel, { type UserProfileDTO } from "@models/userModel";
import { useAuth } from "@stores/authStore";
import Cookies from "js-cookie";

const useUserController = () => {
  const resetAuth = useAuth((state) => state.resetAuth);

  const { useGetUserProfile } = useUserModel();

  const { onError } = useHelper();

  const useGetUserProfileService = () => {
    const { data, isLoading, isError, error } = useGetUserProfile();

    let finalData: UserProfileDTO = {
      id: 0,
      name: "",
      username: "",
      email: "",
      profile_image_url: "",
      tier_id: null,
    };

    if (!isLoading) {
      if (isError) {
        console.log(error);
        if (error.status === 404) {
          localStorage.removeItem("@data");
          Cookies.remove("refresh_token");
          resetAuth();
        }

        onError(error);
      } else if (data) {
        finalData = {
          ...data.data,
          profile_image_url: "https://i.pravatar.cc/150?img=3",
        };
      }
    }

    return {
      finalData,
      isLoading,
    };
  };

  return {
    useGetUserProfileService,
  };
};

export default useUserController;
