import TextArea from "../../../components/Form/TextArea";
import React, { useEffect, useRef } from "react";
import {
  CommentValidationSchema,
  commentValidationSchema,
} from "../../posts/Components/PostEngagements";
import { Button } from "../../../components/Elements/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import postComment from "../api/postComments";
import { Comment } from "../../posts/types/postType";

type CreateCommentProps = {
  showComments: boolean;
  handleShowComments: () => void;
  handleRefetch: () => void;
  postId: string;
  comment?: Comment;
  closeModal?: () => void;
};
const CreateComment = ({
  showComments,
  handleShowComments,
  handleRefetch,
  postId,
  comment,
  closeModal,
}: CreateCommentProps) => {
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const {
    control,
    register,
    trigger,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<CommentValidationSchema>({
    resolver: zodResolver(commentValidationSchema),
  });
  const handleInputChange = async (field: keyof CommentValidationSchema) => {
    !showComments && handleShowComments();
    await trigger(field);
  };
  const { mutate, error, isLoading } = postComment(postId, comment?._id);
  const onSubmit: SubmitHandler<CommentValidationSchema> = (data) => {
    mutate(data);
    setValue("content", "");
    if (comment && closeModal) {
      closeModal();
    }
  };
  useEffect(() => {
    if (comment?.content) {
      setValue("content", comment.content);
    }
  }, []);
  return (
    <form
      className={`${
        comment ? "w-full" : "w-10/12"
      }  h-16 transition-all duration-300 lg:w-11/12`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextArea<CommentValidationSchema>
        ref={commentRef}
        name="content"
        control={control}
        errors={errors || error}
        label=""
        type="comment"
        placeholder="Enter a comment 💭"
        defaultValue={comment ? comment.content : ""}
        onKeyDown={handleInputChange}
        className="border shadow-lg rounded-2xl"
        // handlePostComment={handlePostComment}
      >
        <Button
          type="submit"
          size="xs"
          variant="inverse"
          isLoading={isLoading}
          className="absolute border-none rounded-full cursor-pointer top-2 h-11/12 right-2 bg-gradient-to-l from-white to-transparent "
          onClick={(e) => {
            // handleComment(commentRef);
            handleShowComments();
            handleRefetch();
          }}
        >
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="text-base text-slate-500"
          />
        </Button>
      </TextArea>
    </form>
  );
};

export default CreateComment;
