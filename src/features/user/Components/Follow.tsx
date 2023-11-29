import { Author } from "features/posts/types/postType";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "stores/store";
import { Button } from "../../../components/Elements/Button";
import postFollow from "../api/postUserFollow";

type FollowProps = {
  toBeFollowedUserId: string;
  isFollowing: boolean;
  className?: string;
};
const Follow = ({
  toBeFollowedUserId,
  isFollowing,
  className,
}: FollowProps) => {
  const { mutate, error, isLoading } = postFollow(toBeFollowedUserId);
  const [isFollowed, setIsFollowed] = useState(isFollowing);
  const user = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );
  const { t } = useTranslation();
  return (
    <>
      {user?.account._id !== toBeFollowedUserId && (
        <Button
          variant={isFollowed ? "moretransparent" : "blend"}
          className={`${
            className
              ? "self-center mt-0 py-0.5  rounded-3xl w-24 md:w-32 text-sm md:text-base"
              : "  self-center  w-32 mt-4"
          }   border-none `}
          size={className ? "xs" : "md"}
          isLoading={isLoading}
          onClick={() => {
            setIsFollowed((prevState) => !prevState);
            mutate();
          }}
        >
          {isFollowed ? t("userPages.unfollow") : t("userPages.follow")}
        </Button>
      )}
    </>
  );
};

export default Follow;
