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
import DropMenu, { DeleteActiveIcon, EditActiveIcon } from "./Menu";
import { Menu, Transition } from "@headlessui/react";
import CreatePost from "./CreatePost";
export type RefetchProps = {
  refetch: () => void;
};

const PostCard = ({ post }: PostCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScreenSmall, setIsScreenSmall] = useState(true);
  const user = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );

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
      {post.author._id === user?._id && (
        <>
          <Menu as="div" className="absolute top-4 right-4">
            <div>
              <Menu.Button
                className={`w-8 h-8 hover:bg-slate-200  rounded-full transtion-all`}
              >
                <FontAwesomeIcon
                  className="text-xl rotate-90 rounded-full cursor-pointer text-slate-700"
                  icon={faEllipsis}
                  // onClick={}
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-32 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-gradient-to-r from-teal-200 to-teal-400  text-slate-700"
                            : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => {
                          setIsOpenPost(true);
                        }}
                      >
                        {/* <EditActiveIcon /> */}
                        <FontAwesomeIcon
                          icon={faEdit}
                          className={`pr-1  ${
                            active ? " text-slate-700" : "text-gray-900"
                          }`}
                        />
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-gradient-to-r from-teal-200 to-teal-400"
                            : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className={`pr-1 
                      ${active ? " text-slate-700" : "text-gray-900"}
                      `}
                        />
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          {isOpenPost && (
            <CreatePost
              isOpen={isOpenPost}
              setIsOpen={setIsOpenPost}
              post={post}
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
