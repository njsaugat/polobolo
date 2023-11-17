import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import Avatar from "../../user/Components/Avatar";
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

const TOTAL_TAGS = 10;
export type CreatePostDialogProps = {
  post?: Post;
  postId?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const CreatePost = ({ post, isOpen, setIsOpen }: CreatePostDialogProps) => {
  const [tags, setTags] = useState<string[]>(post?.tags ? post?.tags : []);
  const postContentRef = useRef<HTMLTextAreaElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const [errorDispatched, setErrorDispatched] = useState(false);
  const [fileDataURLs, setFileDataURLs] = useState<string[]>(
    post?.images ? post?.images.map((post) => post.url) : []
  );
  const validationRules = post ? {} : { required: "This field is required" };
  const { mutate, error, isLoading: isPostLoading } = createPost(post?._id);
  function closeModal() {
    const confirmation = window.confirm("All your changes will be discarded.");

    if (confirmation) {
      setIsOpen(false);
      clearErrors("content");
      setTags([]);
      setValue("content", "");
      setErrorDispatched(false);
    }
  }

  function openModal() {
    setIsOpen(true);
  }
  useEffect(() => {
    if (post?.content) {
      setValue("content", post.content);
    }
  }, []);
  const {
    control,
    register,
    trigger,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<CreatePostValidationSchema>({
    resolver: zodResolver(createPostValidationSchema),
  });
  function onKeyDownTag(e: KeyboardEvent) {
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
  }

  const removeTag = (tag: string) => {
    setTags((prevTags) => prevTags.filter((prevTag) => prevTag !== tag));
  };
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
    if (tagRef && "current" in tagRef && tagRef.current) {
      tagRef.current.value = "";
    }
  }, [tags]);
  const onSubmit: SubmitHandler<CreatePostValidationSchema> = (data) => {
    const formData = new FormData();

    fileDataURLs
      .filter((fileDataURL) => !fileDataURL.includes("http://"))
      .forEach((dataURL, index) => {
        const base64String = dataURL.split(",")[1]; // Split the Data URL to get the base64 part
        const binaryData = atob(base64String);
        const blob = new Blob(
          [new Uint8Array([...binaryData].map((char) => char.charCodeAt(0)))],
          { type: "application/octet-stream" }
        );
        formData.append(`images`, blob, `file_${index}.png`);
      });
    formData.append("content", data.content);

    tags.forEach((tag, ind) => {
      formData.append(`tags`, tag);
    });
    mutate(formData);
    setIsOpen(false);
    setFileDataURLs([]);
    clearErrors("content");
    setTags([]);
    setValue("content", "");
    setErrorDispatched(false);
  };
  const handleInputChange = async (field: keyof CreatePostValidationSchema) => {
    await trigger(field);
  };
  const user = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );
  return (
    <Dialog
      className=" md:w-3/5 lg:w-2/5  md:min-h-[52rem] md:rounded-lg"
      isOpen={isOpen}
      closeModal={closeModal}
      modalClassName="md:mx-10"
    >
      <>
        {/* <h1 className="text-5xl">Hello world</h1> */}
        <CloseModal closeModal={closeModal} />
        <div className="flex items-center justify-between w-full py-3 mt-4 md:mt-0 gap-x-1 lg:gap-x-0">
          <div className="flex items-start justify-center w-2/12 -translate-y-0.5">
            <Avatar
              url={user?.account.avatar.url}
              firstName={user?.account.username}
              username={user?.account.username}
            />
          </div>
          <div className="flex flex-col justify-center w-10/12 h-16 transition-all duration-300 lg:w-11/12">
            <h4>
              {user?.firstName} {user?.lastName}
            </h4>
            <h4 className="text-sm text-slate-500">{user?.account.username}</h4>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <form
            className="flex flex-col w-full h-full transition-all duration-300 md:w-10/12 lg:w-11/12"
            onSubmit={handleSubmit(onSubmit)}
            onClick={() => {
              openModal();
            }}
          >
            <Controller
              name="content"
              control={control}
              rules={validationRules}
              render={({ field }) => (
                <textarea
                  {...field}
                  ref={postContentRef}
                  id="post-content"
                  placeholder="Speak your mind 💬"
                  defaultValue={post?.content ? post?.content : ""}
                  className={`block w-full h-48 md:h-28 px-3 py-2 placeholder-gray-400 border border-gray-300 shadow-lg appearance-none resize-none rounded-2xl focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm 
                          ${
                            errors["content"] &&
                            "border-red-500 hover:border-red-500 "
                          }  `}
                ></textarea>
              )}
            />
            {!post?.content && errors["content"] && (
              <p className="mt-2 text-xs italic text-red-500">
                {errors["content"]?.message}
              </p>
            )}

            <DragAndDrop
              fileDataURLs={fileDataURLs}
              setFileDataURLs={setFileDataURLs}
              TOTAL_UPLOADABLE_IMAGES={6}
            />

            <div className="flex flex-col w-full h-auto gap-2 mt-6">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <CreateTags
                    key={tag + index}
                    tag={tag}
                    removeTag={() => removeTag(tag)}
                  />
                ))}
              </div>
              <input
                name="tag"
                type="text"
                className="w-full p-2 mt-2 border shadow-lg md:mt-1 rounded-xl focus:outline-none"
                placeholder="Add 🔖tags and press enter"
                ref={tagRef}
                onKeyDown={(e) => onKeyDownTag(e)}
                disabled={tags.length >= TOTAL_TAGS}
                onChange={(e) => {
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
                }}
              />
            </div>
            {/* </div> */}

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
