import { useEffect, useState } from "react";

const useInfiniteScroll = (fetchNextPage) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let debounceTimer: number;
    const handleScroll = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY || window.pageYOffset;
        const pageHeight = document.body.scrollHeight;
        const threshold = 100;

        if (!isLoading && windowHeight + scrollY >= pageHeight - threshold) {
          setIsLoading(true);
          fetchNextPage()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
        }
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(debounceTimer);
    };
  }, [fetchNextPage, isLoading]);
};

export default useInfiniteScroll;
