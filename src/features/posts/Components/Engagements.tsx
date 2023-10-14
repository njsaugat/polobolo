import React, {
  ForwardedRef,
  createRef,
  useContext,
  useRef,
  useState,
} from "react";
import { Comment, PostCardProps } from "../types/postType";
import InputField from "../../../features/auth/Components/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import postComment from "../api/postComments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faArrowLeft,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../../components/Elements/Button";
import getComments from "../api/getComments";
import SingleComment from "./Comment";
import { Spinner } from "../../../components/Elements/Spinner";
import Avatar from "./Avatar";
import Like from "../../../components/Elements/Like";
import Bookmark from "../../../components/Elements/Bookmark";
import postLike from "../api/postLike";
import { RefetchProps } from "./Post";
import { CommentRefetchContext } from "../context/CommentContext";
import { PostRefetchContext } from "../context/PostContext";
import { useDispatch } from "react-redux";
import { addRefetch } from "../../../stores/refetchSlice";
import ShimmerComment from "../../../components/Elements/ShimmerComment";
import CreateComment from "./CreateComment";
import { UserContext } from "../context/UserContext";

export const commentValidationSchema = z.object({
  content: z
    .string()
    .min(3, { message: "Comment should be at least 3 characters." }),
});
export type ModelOpen = { isModalOpen?: boolean };

export type CommentValidationSchema = z.infer<typeof commentValidationSchema>;
const Engagements = ({ post, isModalOpen }: PostCardProps & ModelOpen) => {
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [showComments, setShowComments] = useState(
    isModalOpen ? isModalOpen : false
  );
  const dispatch = useDispatch();
  const handleRefetch = () => {
    dispatch(addRefetch(refetch));
  };
  const handleShowComments = () => {
    setShowComments(true);
  };
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
  const { user } = useContext(UserContext);

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
        <Bookmark className={` text-2xl`} />
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
        //  :
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
              {isCommentLoading && (
                <div
                  className={`flex mt-4 flex-col items-center justify-center w-full `}
                >
                  {/* <Spinner size={"md"} className="text-center text-current" /> */}
                  {new Array(5).fill(1).map((value, index) => (
                    <ShimmerComment key={value + index} />
                  ))}
                </div>
              )}
              {data?.pages.map((page, pageIndex) => {
                if (page?.data?.comments.length === 0) {
                  return (
                    <div className="mt-2 text-base text-slate-700">
                      👋 Enter the first comment.
                    </div>
                  );
                }
                return page?.data?.comments?.map(
                  (comment: Comment, index: number) => (
                    <CommentRefetchContext.Provider
                      key={comment._id}
                      value={{
                        refetch,
                        page: page.data.page,
                        // handleShowComments: handleShowComments,
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
                  )
                );
              })}
              {hasNextPage && (
                <>
                  {isFetchingNextPage && (
                    <div className="flex flex-col items-center justify-center w-full mt-4">
                      {/* <Spinner size={"md"} className="text-center text-current" /> */}
                      {new Array(5).fill(1).map((value, index) => (
                        <ShimmerComment key={value + index} />
                      ))}
                    </div>
                  )}
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
