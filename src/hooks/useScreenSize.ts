import { useEffect, useState } from "react";

const useScreenSize = (screenSize: number) => {
  const [isScreenSmall, setIsScreenSmall] = useState(true);

  const handleResize = () => {
    if (window.innerWidth >= screenSize) {
      setIsScreenSmall(false);
    } else {
      setIsScreenSmall(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isScreenSmall;
};

export default useScreenSize;
