import { useMediaQuery } from "react-responsive";

const useResponsive = () => {
  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  const isMobileLg = useMediaQuery({
    query: "(max-width: 873px)",
  });

  return {
    isTablet,
    isMobileLg,
  };
};

export default useResponsive;
