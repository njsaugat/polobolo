import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Button } from "../../../components/Elements/Button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../stores/store";
import { Author, Post } from "../types/postType";
import { Dialog } from "../../../components/Elements/Dialog";
import CloseModal from "../../../components/Elements/CloseModal";
import DragAndDrop from "../../../components/Shared/DragDropPhotos";
import CreateTags from "./CreateTags";
import { addNotification } from "../../../stores/notificationSlice";
import {
  CreatePostValidationSchema,
  createPostValidationSchema,
} from "../utils/createPostSchema";
import createPost from "../api/createPost";
import { TOTAL_TAGS, TOTAL_UPLOADABLE_IMAGES } from "../../../config/constants";
import AuthorProfile from "../../../features/user/Components/AuthorProfile";
import TextArea from "../../../components/Form/TextArea";
import CreatePostTags from "./CreatePostTags";
import { convertToBlob } from "../../../utils/convertToBlob";

export type CreatePostDialogProps = {
  post?: Post;
  postId?: string;
  isOpen: boolean;
  openPostModal: () => void;
  closePostModal: () => void;
};
const CreatePost = ({
  post,
  isOpen,
  openPostModal,
  closePostModal,
}: CreatePostDialogProps) => {
  const [tags, setTags] = useState<string[]>(post?.tags ? post?.tags : []);
  const [errorDispatched, setErrorDispatched] = useState(false);
  const [fileDataURLs, setFileDataURLs] = useState<string[]>(
    post?.images ? post?.images.map((post) => post.url) : []
  );
  const postContentRef = useRef<HTMLTextAreaElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const { mutate, error, isLoading: isPostLoading } = createPost(post?._id);
  const {
    control,
    trigger,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<CreatePostValidationSchema>({
    resolver: zodResolver(createPostValidationSchema),
  });

  const user = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );

  const resetFormState = () => {
    closePostModal();
    clearErrors("content");
    setTags([]);
    setValue("content", "");
    setErrorDispatched(false);
  };

  const closeModal = () => {
    const confirmation = window.confirm("All your changes will be discarded.");

    if (confirmation) {
      resetFormState();
    }
  };

  const onKeyDownTag = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (
        tagRef &&
        "current" in tagRef &&
        tagRef.current &&
        tagRef?.current?.value
      ) {
        setTags((prevTags) => {
          return [...prevTags, tagRef?.current?.value || ""];
        });
      }
    }
  };

  const removeTag = (tag: string) => {
    setTags((prevTags) => prevTags.filter((prevTag) => prevTag !== tag));
  };

  const onSubmit: SubmitHandler<CreatePostValidationSchema> = (data) => {
    const formData = new FormData();

    fileDataURLs
      .filter((fileDataURL) => !fileDataURL.includes("http://"))
      .forEach((dataURL, index) => {
        const blob = convertToBlob(dataURL);
        formData.append(`images`, blob, `file_${index}.png`);
      });
    formData.append("content", data.content);

    tags.forEach((tag, ind) => {
      formData.append(`tags`, tag);
    });
    mutate(formData);
    setFileDataURLs([]);
    resetFormState();
  };

  const handleInputChange = async (field: keyof CreatePostValidationSchema) => {
    await trigger(field);
  };

  const handleTotalAllowedTags = () => {
    if (tags.length >= TOTAL_TAGS - 1 && !errorDispatched) {
      const { dispatch } = store;
      dispatch(
        addNotification({
          type: "warning",
          title: "Warning",
          message: `Only ${TOTAL_TAGS} tags are allowed per post.`,
        })
      );
      setErrorDispatched(true);
    }
  };

  useEffect(() => {
    if (post?.content) {
      setValue("content", post.content);
    }
  }, []);

  useEffect(() => {
    const focusTextarea = () => {
      if (postContentRef.current) {
        postContentRef.current.focus();
      }
    };
    const timeout = setTimeout(focusTextarea, 0);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    if (tagRef?.current?.value) {
      tagRef.current.value = "";
    }
  }, [tags]);

  return (
    <Dialog
      className=" md:w-3/5 lg:w-2/5  md:min-h-[52rem] md:rounded-lg"
      isOpen={isOpen}
      closeModal={closeModal}
      modalClassName="md:mx-10"
    >
      <>
        <CloseModal closeModal={closeModal} />
        <div className="flex items-center justify-between w-full py-3 mt-4 md:mt-0 gap-x-1 lg:gap-x-0">
          <AuthorProfile
            username={user?.account.username ?? ""}
            url={user?.account.avatar.url ?? ""}
            firstName={user?.firstName ?? ""}
            lastName={user?.lastName ?? ""}
            bio={user?.account.username ?? ""}
            className="text-sm "
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <form
            className="flex flex-col w-full h-full transition-all duration-300 md:w-10/12 lg:w-11/12"
            onSubmit={handleSubmit(onSubmit)}
            onClick={openPostModal}
          >
            <TextArea<CreatePostValidationSchema>
              name="content"
              ref={postContentRef}
              control={control}
              errors={errors}
              label=""
              type="text"
              placeholder="Speak your mind 💬"
              defaultValue={post?.content ? post?.content : ""}
              className={`block w-full h-48 md:h-28 px-3 py-2 placeholder-gray-400 border border-gray-300 shadow-lg 
              appearance-none resize-none rounded-2xl focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm 
              ${
                !!errors["content"] && "border-red-500 hover:border-red-500 "
              }  `}
              onKeyDown={handleInputChange}
              isNotIncreasePostHeight={true}
            ></TextArea>

            <DragAndDrop
              fileDataURLs={fileDataURLs}
              setFileDataURLs={setFileDataURLs}
              TOTAL_UPLOADABLE_IMAGES={TOTAL_UPLOADABLE_IMAGES}
            />

            <CreatePostTags
              tags={tags}
              removeTag={removeTag}
              handleTotalAllowedTags={handleTotalAllowedTags}
              tagRef={tagRef}
              onKeyDownTag={onKeyDownTag}
            />

            <Button
              isLoading={isPostLoading}
              type="submit"
              variant="blend"
              className="self-end mt-6 text-right rounded-full"
            >
              {post ? "Update" : "Post"}
            </Button>
          </form>
        </div>
      </>
    </Dialog>
  );
};

export default CreatePost;
