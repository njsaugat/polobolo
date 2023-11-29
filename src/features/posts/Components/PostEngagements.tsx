import {
  faAngleDoubleDown,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { Button } from "../../../components/Elements/Button";
import Bookmark from "../../../components/Shared/Bookmark";
import Like from "../../../components/Shared/Like";
import ShimmerComment from "../../../components/Shimmer/ShimmerComment";
import { addRefetch } from "../../../stores/refetchSlice";
import { RootState } from "../../../stores/store";
import SingleComment from "../../comments/Components/Comment";
import CreateComment from "../../comments/Components/CreateComment";
import getComments from "../../comments/api/getComments";
import Avatar from "../../user/Components/Avatar";
import postBookmark from "../api/postBookmark";
import postLike from "../api/postLike";
import { CommentRefetchContext } from "../context/CommentContext";
import { Author, PostCardProps } from "../types/postType";

export const commentValidationSchema = z.object({
  content: z
    .string()
    .min(3, { message: t("validationMessages.commentContent") }),
});
export type ModalOpen = { isModalOpen?: boolean };

export type CommentValidationSchema = z.infer<typeof commentValidationSchema>;
const ShimmerComments = () => (
  <div className={`flex mt-4 flex-col items-center justify-center w-full `}>
    {new Array(5).fill(1).map((value, index) => (
      <ShimmerComment key={value + index} />
    ))}
  </div>
);
const Engagements = ({ post, isModalOpen }: PostCardProps & ModalOpen) => {
  const [showComments, setShowComments] = useState(
    isModalOpen ? isModalOpen : false
  );
  const dispatch = useDispatch();

  const {
    isLoading: isCommentLoading,
    error: commentError,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = getComments(post._id, showComments);

  const { mutate: mutateLike, error: likeError } = postLike(
    post._id,
    post.isLiked
  );
  const { mutate: mutateBookmark, error: errorBookmark } = postBookmark(
    post._id
  );

  const user = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );
  const handleRefetch = () => {
    dispatch(addRefetch(refetch));
  };
  const handleShowComments = () => {
    setShowComments(true);
  };

  return (
    <>
      <div className="flex items-center justify-between mt-4">
        <div
          className="flex items-center justify-center text-teal-500 gap-x-1"
          onClick={() => {
            mutateLike();
          }}
        >
          <Like isLike={post.isLiked} className={` text-2xl`} />
          <span>{post.likes}</span>
        </div>
        <Bookmark
          isBookmarkedPost={post.isBookmarked}
          className={` text-2xl`}
          handleBookmarkPost={() => {
            mutateBookmark();
          }}
        />
        <button
          className="flex items-center justify-center text-teal-500 cursor-pointer hover:underline gap-x-1"
          onClick={handleShowComments}
        >
          <FontAwesomeIcon
            icon={faComment}
            className="text-2xl text-slate-200 hover:opacity-70"
          />

          <span>{post.comments}</span>
        </button>
      </div>
      <div className="flex items-center justify-between w-full py-3 gap-x-1 min-h-[6rem] lg:gap-x-0">
        <div className="flex items-start justify-center w-2/12 -translate-y-0.5">
          <Avatar
            url={user?.account.avatar.url}
            firstName={user?.account.username}
            username={user?.account.username}
          />
        </div>
        <CreateComment
          showComments={showComments}
          handleShowComments={handleShowComments}
          handleRefetch={handleRefetch}
          postId={post._id}
        />
      </div>
      {showComments && (
        <>
          <hr />
          <div
            className={`flex flex-col items-center justify-center overflow-auto `}
          >
            <div
              className={`flex flex-col justify-start items-center w-full ${
                isModalOpen && " lg:h-auto lg:overflow-y-auto"
              }`}
            >
              {isCommentLoading ? <ShimmerComments /> : null}
              {data?.pages?.map((page, pageIndex) => {
                if (page?.data?.comments.length === 0) {
                  return (
                    <div className="mt-2 text-base text-slate-700">
                      👋 Enter the first comment.
                    </div>
                  );
                }
                return page?.data?.comments?.map((comment, index) => (
                  <CommentRefetchContext.Provider
                    key={comment._id}
                    value={{
                      refetch,
                      page: page.data.page,
                    }}
                  >
                    {pageIndex === 0 &&
                    index === 0 &&
                    isModalOpen &&
                    page?.data.comments.length > 2 ? (
                      <div className="w-full lg:mt-1">
                        <SingleComment comment={comment} />
                      </div>
                    ) : (
                      <SingleComment comment={comment} />
                    )}
                  </CommentRefetchContext.Provider>
                ));
              })}
              {hasNextPage && (
                <>
                  {isFetchingNextPage ? <ShimmerComments /> : null}
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
          </div>
        </>
      )}
    </>
  );
};

export default Engagements;
