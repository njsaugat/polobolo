import { useDisclosure } from "../../../hooks/useDisclosure";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CloseModal from "../../../components/Elements/CloseModal";
import Like from "../../../components/Shared/Like";
import { RootState } from "../../../stores/store";
import DeletePost from "../../posts/Components/DeletePost";
import EditDeleteMenu from "../../posts/Components/EditDeletePostMenu";
import { PostRefetchContext } from "../../posts/context/PostContext";
import { Author, Comment } from "../../posts/types/postType";
import Avatar from "../../user/Components/Avatar";
import deleteComment from "../api/deleteComment";
import postLikeComment from "../api/postLikeComment";
import CommentContent from "./CommentContent";
import CreateComment from "./CreateComment";

type CommentProps = { comment: Comment };
const SingleComment = ({ comment }: CommentProps) => {
  const {
    isOpen: isOpenCommentEdit,
    open: openCommentEdit,
    close: closeCommentEdit,
  } = useDisclosure(false);
  const {
    isOpen: isOpenCommentDelete,
    open: openCommentDelete,
    close: closeCommentDelete,
  } = useDisclosure(false);
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
  const { t } = useTranslation();
  return (
    <div className={` relative overflow-hidden w-full p-3 my-1  `}>
      <div className="flex justify-between ">
        <div className="flex items-center mb-2">
          <Avatar
            url={comment.author.account.avatar.url}
            firstName={comment.author.firstName}
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
              closeModal={closeCommentEdit}
            />
            <CloseModal closeModal={closeCommentEdit} closeComment={true} />
          </div>
        ) : (
          <CommentContent content={comment.content} />
        )}
      </div>
      {comment.author._id === user?._id && (
        <>
          <EditDeleteMenu
            openEditModal={openCommentEdit}
            openDeleteModal={openCommentDelete}
            className="comment"
            isShown={isOpenCommentEdit ? false : true}
          />
          {isOpenCommentDelete && (
            <>
              <DeletePost
                isOpen={isOpenCommentDelete}
                closeModal={closeCommentDelete}
                isLoading={isLoading}
                handleDelete={() => {
                  mutateDelete();
                  closeCommentEdit();
                }}
                content={t("comments.deleteComment")}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SingleComment;
