import { useSelector } from "react-redux";
import { RootState } from "stores/store";
import { Author } from "../../posts/types/postType";
import { Navigate, useParams } from "react-router-dom";
import UserDetails from "./UserDetails";

const Settings = () => {
  const user = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );
  const { username } = useParams();

  if (user?.account.username !== username) {
    return <Navigate to={`/user/${username}/about`} />;
  }
  return <UserDetails />;
};

export default Settings;
