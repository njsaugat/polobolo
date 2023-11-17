import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/Elements/Button";
import TextArea from "../../../components/Form/TextArea";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { z } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import postMessage from "../api/postMessage";
import { useParams } from "react-router-dom";
import { useSocket } from "../../../context/SocketContext";
import { STOP_TYPING_EVENT, TYPING_EVENT } from "./ChatSection";

export const chatMessageValidationSchema = z.object({
  chatMessage: z
    .string()
    .min(0, { message: "Message should be at least 1 character." }),
});

export type ChatMessageValidationSchema = z.infer<
  typeof chatMessageValidationSchema
>;

type ChatComposerProps = {
  addCurrentMessage: (message: string) => void;
};
const ChatComposer = ({ addCurrentMessage }: ChatComposerProps) => {
  const { chatId } = useParams();
  const inactivityTimeoutRef = useRef<number>();
  const inactiveThreshold = 5000;
  const {
    control,
    trigger,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<ChatMessageValidationSchema>({
    resolver: zodResolver(chatMessageValidationSchema),
  });
  const { mutate, error, isLoading } = postMessage(chatId);
  const chatMessageRef = useRef<HTMLTextAreaElement>(null);
  const { socket } = useSocket();
  const handleInputChange = async (
    field: keyof ChatMessageValidationSchema
  ) => {
    socket?.emit(TYPING_EVENT, chatId);
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef?.current);
    }
    inactivityTimeoutRef.current = setTimeout(() => {
      socket?.emit(STOP_TYPING_EVENT, chatId);
    }, inactiveThreshold);

    await trigger(field);
  };

  const onSubmit: SubmitHandler<ChatMessageValidationSchema> = (data) => {
    const formData = new FormData();
    formData.append("content", data.chatMessage);
    mutate(formData);
    addCurrentMessage(data.chatMessage);
    setValue("chatMessage", "");
    socket?.emit(STOP_TYPING_EVENT, chatId);
  };

  return (
    <form
      className="sticky flex items-center justify-center w-full md:border-t"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextArea<ChatMessageValidationSchema>
        name="chatMessage"
        ref={chatMessageRef}
        control={control}
        errors={errors}
        label=""
        type="comment"
        placeholder="Enter your message."
        defaultValue=""
        onKeyDown={handleInputChange}
      >
        <Button
          type="submit"
          size="xs"
          variant="inverse"
          isLoading={isLoading}
          className="absolute border-none rounded-full cursor-pointer top-2 h-11/12 right-2 bg-gradient-to-l from-white to-transparent "
          onClick={(e) => {}}
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

export default ChatComposer;
