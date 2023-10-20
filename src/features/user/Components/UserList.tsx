import CloseModal from "components/Elements/CloseModal";
import { Dialog } from "../../../components/Elements/Dialog";
import AuthorProfile from "./AuthorProfile";
import { FollowerProfile } from "../../posts/types/postType";
import React, { useRef } from "react";
import getFollowersList from "../api/getFollowersList";
import ShimmerAvatar from "../../../components/Shimmer/ShimmerAvatar";
import { Button } from "../../../components/Elements/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import Follow from "./Follow";

type UserListProps = {
  isOpen: boolean;
  closeModal: () => void;
  //   data: any;
  followers: boolean;
};
const UserList = ({ isOpen, closeModal, followers }: UserListProps) => {
  const searchKey = followers ? "followers" : "following";
  const {
    error: followersError,
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = getFollowersList(followers);
  const divRef = useRef(null);
  useInfiniteScroll(fetchNextPage);
  return (
    <>
      <Dialog
        className=" md:w-1/2 lg:w-1/3  min-h-[10rem] rounded-lg h-[36rem] overflow-auto deleteDialog  "
        isOpen={isOpen}
        closeModal={closeModal}
        modalClassName="mx-10"
      >
        <div ref={divRef}>
          {isLoading ? (
            new Array(6)
              .fill(1)
              .map((profile, index) => <ShimmerAvatar key={profile + index} />)
          ) : (
            <div className="flex flex-col space-y-3 ">
              {data?.pages?.map((page: any) => {
                return page?.data[searchKey].map(
                  (follower: FollowerProfile) => {
                    return (
                      <div
                        key={follower._id + follower.username}
                        className="flex items-center justify-between w-full "
                      >
                        <AuthorProfile
                          username={follower.username}
                          url={follower.avatar.url}
                          firstName={follower.profile.firstName}
                          lastName={follower.profile.lastName}
                          bio={follower.profile.bio}
                          className="text-xs "
                        />

                        <Follow
                          toBeFollowedUserId={follower._id}
                          isFollowing={follower.isFollowing}
                          className="mt-0"
                        />
                      </div>
                    );
                  }
                );
              })}

              {hasNextPage && (
                <>
                  {isFetchingNextPage &&
                    new Array(6)
                      .fill(1)
                      .map((profile, index) => (
                        <ShimmerAvatar key={profile + index} />
                      ))}
                  <Button
                    variant="blend"
                    size="md"
                    isLoading={isFetchingNextPage}
                    className="flex items-center self-center justify-center align-middle rounded-full w-14 h-14 "
                    onClick={() => {
                      fetchNextPage();
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faAngleDoubleDown}
                      className="text-xl text-slate-700"
                    />
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default UserList;
