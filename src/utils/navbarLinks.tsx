import {
  faBookmark,
  faGear,
  faPencilSquare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const links = [
  {
    id: 1,
    link: "about",
    text: "About",
    icon: <FontAwesomeIcon icon={faUser} />,
  },
  {
    id: 2,
    link: "posts",
    text: "Posts",
    icon: <FontAwesomeIcon icon={faPencilSquare} />,
  },

  {
    id: 3,
    link: "bookmarks",
    text: "Bookmarks",
    icon: <FontAwesomeIcon icon={faBookmark} />,
  },
  {
    id: 4,
    link: "settings",
    text: "Settings",
    icon: <FontAwesomeIcon icon={faGear} />,
  },
];
