import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { Button } from "../../../components/Elements/Button";
import { Dialog } from "../../../components/Elements/Dialog";
import { ShimmerAvatars } from "../../../components/Shimmer/ShimmerAvatar";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { FollowerProfile } from "../../posts/types/postType";
import getFollowersList from "../api/getFollowersList";
import AuthorProfile from "./AuthorProfile";
import Follow from "./Follow";

type UserListProps = {
  isOpen: boolean;
  closeModal: () => void;
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
            <ShimmerAvatars />
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
                          closeModal={closeModal}
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
                  {isFetchingNextPage ? <ShimmerAvatars /> : null}
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
