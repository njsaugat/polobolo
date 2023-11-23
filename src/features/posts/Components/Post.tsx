import { useState } from "react";
import { Dialog } from "../../../components/Elements/Dialog";

import { Author, PostCardProps } from "../types/postType";
import PostAuthor from "./PostAuthor";
import Tags from "./Tags";
import Engagements from "./PostEngagements";
import Carousel from "../../../components/Shared/Carousel";
import CloseModal from "../../../components/Elements/CloseModal";
import { useSelector } from "react-redux";
import { RootState } from "stores/store";
import CreatePost from "./CreatePost";
import DeletePost from "./DeletePost";
import EditDeleteMenu from "./EditDeletePostMenu";
import deletePost from "../api/deletePost";
import { useLocation } from "react-router-dom";
import LoadImage from "../../../components/Elements/LoadImage";
import useScreenSize from "../../../hooks/useScreenSize";
export type RefetchProps = {
  refetch: () => void;
};

const PostCard = ({ post }: PostCardProps) => {
  const [isOpenPostImage, setIsOpenPostImage] = useState(false);
  const [isOpenPostEdit, setIsOpenPostEdit] = useState(false);
  const [isOpenPostDelete, setIsOpenPostDelete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { pathname } = useLocation();
  const isScreenSmall = useScreenSize(992);
  const user = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );
  const { mutate, error, isLoading } = deletePost(post._id);

  const closePostImageModal = () => setIsOpenPostImage(false);

  const openPostImageModal = () => setIsOpenPostImage(true);

  const openModalEdit = () => setIsOpenPostEdit(true);
  const closeModalEdit = () => setIsOpenPostEdit(false);

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + post.images.length) % post.images.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % post.images.length);
  };
  const postTextContent = (
    <PostAuthor post={post}>
      <p className="mt-4">{post.content}</p>
    </PostAuthor>
  );
  return (
    <div className="relative w-11/12 p-4 bg-white rounded-lg shadow-2xl drop- md:w-3/5 lg:w-1/2">
      {postTextContent}
      {post.author._id === user?._id &&
        pathname.includes(user?.account.username.toLowerCase()) && (
          <>
            <EditDeleteMenu
              openEditModal={() => setIsOpenPostEdit(true)}
              openDeleteModal={() => setIsOpenPostDelete(true)}
              isShown={true}
            />
            {isOpenPostEdit ? (
              <CreatePost
                isOpen={isOpenPostEdit}
                openPostModal={openModalEdit}
                closePostModal={closeModalEdit}
                post={post}
              />
            ) : null}
            {isOpenPostDelete ? (
              <DeletePost
                isOpen={isOpenPostDelete}
                closeModal={() => setIsOpenPostDelete(false)}
                isLoading={isLoading}
                handleDelete={() => {
                  mutate();
                  closePostImageModal();
                }}
                content="Are you sure you want to delete the post❓"
              />
            ) : null}
          </>
        )}

      {post?.images.length > 0 && (
        <div
          onClick={openPostImageModal}
          className="px-4 py-2 text-sm font-medium text-white rounded-md cursor-pointer bg-slate-100 bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <div className="grid grid-cols-3 gap-4 mt-4 ">
            {post.images.map((image, index) => (
              <div
                key={image._id}
                className={
                  post.images.length === 1
                    ? "self-center col-span-3 text-center"
                    : ""
                }
                onClick={() => {
                  setCurrentIndex(index);
                }}
              >
                <div className="w-full h-32 overflow-hidden rounded-lg">
                  <LoadImage
                    src={image.url}
                    alt={`Post Image ${index + 1}`}
                    className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform rounded-lg hover:scale-110 hover:rounded-lg "
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Tags post={post} />
      <Engagements post={post} isModalOpen={isOpenPostImage} />

      {isOpenPostImage ? (
        <Dialog
          isOpen={isOpenPostImage}
          closeModal={closePostImageModal}
          modalClassName="lg:overflow-hidden lg:min-h-screen"
        >
          <CloseModal closeModal={closePostImageModal} />
          <div className="lg:flex lg:flex-row-reverse lg:items-start">
            <div className={`flex-col my-4 lg:mx-4 lg:w-1/4 `}>
              {postTextContent}
              <Tags post={post} />
              <div className="hidden lg:block">
                <Engagements post={post} isModalOpen={isOpenPostImage} />
              </div>
            </div>
            <Carousel
              post={post}
              currentIndex={currentIndex}
              prevSlide={prevSlide}
              nextSlide={nextSlide}
            />
          </div>
          {isScreenSmall && (
            <Engagements post={post} isModalOpen={isOpenPostImage} />
          )}
        </Dialog>
      ) : null}
    </div>
  );
};

export default PostCard;
