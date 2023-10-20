import { Button } from "../../../components/Elements/Button";
import React, { useState } from "react";
import postFollow from "../api/postUserFollow";
import { useSelector } from "react-redux";
import { RootState } from "stores/store";
import { Author } from "features/posts/types/postType";

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
  console.log(user?.account._id !== toBeFollowedUserId);
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
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      )}
    </>
  );
};

export default Follow;
