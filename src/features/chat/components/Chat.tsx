import { useSocket } from "../../../context/SocketContext";
import React, { useEffect, useRef, useState } from "react";
import getUserChat from "../api/getUserChat";
import ChatList from "./ChatList";
import ChatSection from "./ChatSection";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import useScreenSize from "../../../hooks/useScreenSize";
import { Dialog } from "../../../components/Elements/Dialog";
import CloseModal from "../../../components/Elements/CloseModal";
const Chat = () => {
  const [message, setMessage] = useState("");
  // const [currentChatId, setCurrentChatId] = useState("");
  const { socket } = useSocket();
  // const currentChat = useRef<HTMLDivElement>(null);
  const { chatId } = useParams();
  const isScreenSmall = useScreenSize(765);

  const sendChat = (e: React.FormEvent) => {
    e.preventDefault();
    socket?.emit("joinChat", { message });
    setMessage("");
    // setChat((prevChat)=>)
  };

  const navigate = useNavigate();
  const closeModal = () => {
    navigate(".");
  };
  return (
    <div className="w-screen flex border-t-[0.1px] h-[calc(100vh-115px)] overflow-auto  ">
      <div className="w-full md:w-2/5 lg:w-1/3 border-r-[0.1px] h-full pt-4">
        {/* <ChatList ref={currentChat} /> */}
        <ChatList />
      </div>
      <div className="hidden w-full h-full md:block md:w-3/5 lg:w-2/3">
        {/* <ChatSection chatId={currentChatId} /> */}
        {!chatId ? (
          <h1 className="flex items-center justify-center w-full h-full">
            No chat selected.
          </h1>
        ) : isScreenSmall ? (
          <Dialog
            isOpen={!!chatId}
            closeModal={closeModal}
            className="flex flex-col justify-end px-0 py-0 -z-10"
          >
            <CloseModal closeModal={closeModal} />
            <ChatSection />
          </Dialog>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Chat;
