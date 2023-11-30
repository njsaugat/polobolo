import { useState } from "react";
import { Dialog } from "../../../components/Elements/Dialog";

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "stores/store";
import CloseModal from "../../../components/Elements/CloseModal";
import LoadImage from "../../../components/Elements/LoadImage";
import Carousel from "../../../components/Shared/Carousel";
import { useDisclosure } from "../../../hooks/useDisclosure";
import useScreenSize from "../../../hooks/useScreenSize";
import deletePost from "../api/deletePost";
import { Author, PostCardProps } from "../types/postType";
import CreatePost from "./CreatePost";
import DeletePost from "./DeletePost";
import EditDeleteMenu from "./EditDeletePostMenu";
import PostAuthor from "./PostAuthor";
import Engagements from "./PostEngagements";
import Tags from "./Tags";
export type RefetchProps = {
  refetch: () => void;
};

const PostCard = ({ post }: PostCardProps) => {
  const {
    isOpen: isOpenPostImage,
    open: openPostImageModal,
    close: closePostImageModal,
  } = useDisclosure(false);
  const {
    isOpen: isOpenPostEdit,
    open: openModalEdit,
    close: closeModalEdit,
  } = useDisclosure(false);
  const {
    isOpen: isOpenPostDelete,
    open: openModalDelete,
    close: closeModalDelete,
  } = useDisclosure(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { pathname } = useLocation();
  const isScreenSmall = useScreenSize(992);
  const user = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );
  const { mutate, error, isLoading } = deletePost(post._id);

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
              openEditModal={openModalEdit}
              openDeleteModal={openModalDelete}
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
                closeModal={closeModalDelete}
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
              images={post?.images}
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
