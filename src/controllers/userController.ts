import useHelper from "@hooks/useHelper";
import useUserModel, { type UserProfileDTO } from "@models/userModel";

const useUserController = () => {
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
