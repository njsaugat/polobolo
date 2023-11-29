import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "../../../components/Elements/Button";
import TextArea from "../../../components/Form/TextArea";
import {
  CommentValidationSchema,
  commentValidationSchema,
} from "../../posts/Components/PostEngagements";
import { Comment } from "../../posts/types/postType";
import postComment from "../api/postComments";

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
  const { t } = useTranslation();
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
        placeholder={`${t("comments.createComment")} 💭`}
        defaultValue={comment ? comment.content : ""}
        onKeyDown={handleInputChange}
        className="border shadow-lg rounded-2xl"
      >
        <Button
          type="submit"
          size="xs"
          variant="inverse"
          isLoading={isLoading}
          className="absolute border-none rounded-full cursor-pointer top-2 h-11/12 right-2 bg-gradient-to-l from-white to-transparent "
          onClick={(e) => {
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
