import {
  faBookmark,
  faGear,
  faPencilSquare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
const useLinks = () => {
  const { t } = useTranslation();
  return useMemo(
    () => [
      {
        id: 1,
        link: "about",
        text: t("userPages.about"),
        icon: <FontAwesomeIcon icon={faUser} />,
      },
      {
        id: 2,
        link: "posts",
        text: t("userPages.posts"),
        icon: <FontAwesomeIcon icon={faPencilSquare} />,
      },
      {
        id: 3,
        link: "bookmarks",
        text: t("userPages.bookmarks"),
        icon: <FontAwesomeIcon icon={faBookmark} />,
      },
      {
        id: 4,
        link: "settings",
        text: t("userPages.settings"),
        icon: <FontAwesomeIcon icon={faGear} />,
      },
    ],
    [t] // No dependencies, meaning it will only be calculated once
  );
};

export default useLinks;
