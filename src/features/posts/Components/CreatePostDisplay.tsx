import React, { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "stores/store";
import { Author } from "../types/postType";
import Avatar from "../../user/Components/Avatar";
import CreatePost from "./CreatePost";

// type CreatePostDisplayProps={
//   // children:ReactNode;
//   openModal:()=>void;
// }

const CreatePostDisplay = () => {
  const [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  const user = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );
  return (
    <div className="w-11/12 p-4 bg-white border rounded-lg shadow-2xl drop- md:w-3/5 lg:w-1/2">
      <div className="flex">
        <div className="flex items-center justify-between w-full py-3 gap-x-1 lg:gap-x-0">
          <div className="flex items-start justify-center w-2/12 ">
            <Avatar
              url={user?.account.avatar.url}
              firstName={user?.account.username}
              username={user?.account.username}
            />
          </div>
          <div
            className="flex items-center w-10/12 transition-all duration-300 lg:w-11/12"
            onClick={() => {
              openModal();
            }}
          >
            <input
              placeholder="Speak your mind 💬"
              onChange={() => {
                openModal();
              }}
              value=""
              className="self-center w-full px-3 py-2 text-sm leading-tight text-gray-700 transition-all duration-300 border rounded-full outline-none hover:border-teal-200"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full text-slate-600">
        <button className="w-1/2 hover:bg-slate-200" onClick={openModal}>
          📷 Photos
        </button>
        <button className="w-1/2 hover:bg-slate-200" onClick={openModal}>
          #️⃣ Tags
        </button>
      </div>
      {/* {children} */}
      <CreatePost isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default CreatePostDisplay;
