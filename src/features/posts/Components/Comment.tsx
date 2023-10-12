import { Comment } from "../types/postType";
import Like from "../../../components/Elements/Like";
import CommentContent from "./CommentContent";
import Avatar from "./Avatar";
import postLikeComment from "../api/postLikeComment";

type CommentProps = { comment: Comment };
const SingleComment = ({ comment }: CommentProps) => {
  const { mutate, error } = postLikeComment(comment._id, comment.isLiked);
  return (
    <div className="w-full p-3 my-1 ">
      <div className="flex justify-between">
        <div className="flex items-center mb-2">
          <Avatar
            url={comment.author.account.avatar.url}
            firstName={comment.author.account.avatar.url}
          />
          <span className="font-bold">
            {comment.author.firstName} {comment.author.lastName}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
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
        <CommentContent content={comment.content} />
      </div>
    </div>
  );
};

export default SingleComment;
