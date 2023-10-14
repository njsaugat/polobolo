// import { Dialog } from "../../../components/Elements/Dialog";
import React, { Fragment, useEffect, useRef, useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";
import { Dialog } from "../../../components/Elements/Dialog";
import Image from "./Image";

import { Author, PostCardProps } from "../types/postType";
import PostAuthor from "./PostAuthor";
import Tags from "./Tags";
import Engagements from "./Engagements";
import Carousel from "./Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCross,
  faEdit,
  faEllipsis,
  faPencil,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import CloseModal from "../../../components/Elements/CloseModal";
import { useSelector } from "react-redux";
import { RootState } from "stores/store";
import { Menu, Transition } from "@headlessui/react";
import CreatePost from "./CreatePost";
import DeletePost from "./DeletePost";
import EditDeleteMenu from "./Menu";
import deletePost from "../api/deletePost";
import { useLocation, useParams } from "react-router-dom";
export type RefetchProps = {
  refetch: () => void;
};

const PostCard = ({ post }: PostCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPostEdit, setIsOpenPostEdit] = useState(false);
  const [isOpenPostDelete, setIsOpenPostDelete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScreenSmall, setIsScreenSmall] = useState(true);
  const { pathname } = useLocation();
  const user = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );
  const { mutate, error, isLoading } = deletePost(post._id);

  // const imageRef=useRef(null)
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + post.images.length) % post.images.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % post.images.length);
  };

  const handleResize = () => {
    if (window.innerWidth >= 992) {
      setIsScreenSmall(false);
    } else {
      setIsScreenSmall(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-11/12 p-4 bg-white rounded-lg shadow-2xl drop- md:w-3/5 lg:w-1/2">
      <PostAuthor post={post} />
      {post.author._id === user?._id &&
        pathname.includes(user?.account.username.toLowerCase()) && (
          <>
            <EditDeleteMenu
              openEditModal={() => setIsOpenPostEdit(true)}
              openDeleteModal={() => setIsOpenPostDelete(true)}
              isShown={true}
            />
            {isOpenPostEdit && (
              <CreatePost
                isOpen={isOpenPostEdit}
                setIsOpen={setIsOpenPostEdit}
                post={post}
              />
            )}
            {isOpenPostDelete && (
              <DeletePost
                isOpen={isOpenPostDelete}
                closeModal={() => setIsOpenPostDelete(false)}
                isLoading={isLoading}
                handleDelete={() => {
                  mutate();
                  closeModal();
                }}
                content="Are you sure you want to delete the post❓"
              />
            )}
          </>
        )}

      {post?.images.length > 0 && (
        <div
          onClick={openModal}
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
                <Image image={image} />
              </div>
            ))}
          </div>
        </div>
      )}
      <Dialog
        isOpen={isOpen}
        closeModal={closeModal}
        modalClassName="lg:overflow-hidden lg:min-h-screen"
      >
        <CloseModal closeModal={closeModal} />
        <div className="lg:flex lg:flex-row-reverse lg:items-start">
          <div className={`flex-col my-4 lg:mx-4 lg:w-1/4 `}>
            <PostAuthor post={post} />
            <Tags post={post} />
            <div className="hidden lg:block">
              <Engagements post={post} isModalOpen={isOpen} />
            </div>
          </div>
          <Carousel
            post={post}
            currentIndex={currentIndex}
            prevSlide={prevSlide}
            nextSlide={nextSlide}
          />
        </div>
        {isScreenSmall && <Engagements post={post} isModalOpen={isOpen} />}
      </Dialog>

      <Tags post={post} />
      <Engagements post={post} isModalOpen={isOpen} />
    </div>
  );
};

export default PostCard;
