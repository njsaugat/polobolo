import { Author, Comment } from "../types/postType";
import Like from "../../../components/Elements/Like";
import CommentContent from "./CommentContent";
import Avatar from "./Avatar";
import postLikeComment from "../api/postLikeComment";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import EditDeleteMenu from "./Menu";
import { useContext, useState } from "react";
import CreateComment from "./CreateComment";
import CloseModal from "../../../components/Elements/CloseModal";
import DeletePost from "./DeletePost";
import { PostRefetchContext } from "../context/PostContext";
import deleteComment from "../api/deleteComment";

type CommentProps = { comment: Comment };
const SingleComment = ({ comment }: CommentProps) => {
  const [isOpenCommentEdit, setIsOpenCommentEdit] = useState(false);
  const [isOpenCommentDelete, setIsOpenCommentDelete] = useState(false);
  const { postId } = useContext(PostRefetchContext);
  const { mutate, error } = postLikeComment(comment._id, comment.isLiked);
  const {
    mutate: mutateDelete,
    error: deleteError,
    isLoading,
  } = deleteComment(comment._id, postId);

  const user = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );
  const closeModal = () => setIsOpenCommentEdit(false);
  return (
    <div className={` relative overflow-hidden w-full p-3 my-1  `}>
      <div className="flex justify-between ">
        <div className="flex items-center mb-2">
          <Avatar
            url={comment.author.account.avatar.url}
            firstName={comment.author.account.avatar.url}
            username={comment.author.account.username}
          />
          <span className="font-bold">
            {comment.author.firstName} {comment.author.lastName}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center -translate-x-2">
          <div
            className="cursor-pointer"
            onClick={() => {
              mutate();
            }}
          >
            <Like isLike={comment.isLiked} />
          </div>
          <div className="mt-2 text-sm text-gray-500">{comment.likes}</div>
        </div>
      </div>

      <div className="flex justify-between w-full gap-x-1 ">
        {isOpenCommentEdit ? (
          <div className="relative flex items-center justify-center w-full">
            <CreateComment
              showComments={true}
              handleShowComments={() => {}}
              handleRefetch={() => {}}
              postId={postId}
              comment={comment}
              closeModal={closeModal}
            />
            <CloseModal closeModal={closeModal} closeComment={true} />
          </div>
        ) : (
          <CommentContent content={comment.content} />
        )}
      </div>
      {comment.author._id === user?._id && (
        // <div className="translate-y-3">
        <>
          <EditDeleteMenu
            openEditModal={() => setIsOpenCommentEdit(true)}
            openDeleteModal={() => setIsOpenCommentDelete(true)}
            className="comment"
            isShown={isOpenCommentEdit ? false : true}
          />
          {isOpenCommentDelete && (
            <>
              <DeletePost
                isOpen={isOpenCommentDelete}
                closeModal={() => setIsOpenCommentDelete(false)}
                isLoading={isLoading}
                handleDelete={() => {
                  mutateDelete();
                  closeModal();
                }}
                content="Are you sure you want to delete the comment❓"
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SingleComment;
