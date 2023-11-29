import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { RootState } from "../../../stores/store";
import { Author } from "../types/postType";
import Posts from "./Posts";

const Bookmarks = () => {
  const user = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );
  const { username } = useParams();

  if (user?.account.username !== username) {
    return <Navigate to={`/user/${username}/about`} />;
  }
  return (
    <div>
      <h1 className="my-5 text-2xl text-center md:text-3xl"></h1>
      <Posts bookmarks={true} />
    </div>
  );
};

export default Bookmarks;
