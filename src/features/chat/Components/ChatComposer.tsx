import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../components/Elements/Button";
import TextArea from "../../../components/Form/TextArea";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { STOP_TYPING_EVENT, TYPING_EVENT } from "../../../config/constants";
import { useSocket } from "../../../context/SocketContext";
import postMessage from "../api/postMessage";
export const chatMessageValidationSchema = z.object({
  chatMessage: z
    .string()
    .min(0, { message: t("validationMessages.chatMessage") }),
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
  const { t } = useTranslation();
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
        placeholder={t("chatPage.enterMessage")}
        defaultValue=""
        onKeyDown={handleInputChange}
      >
        <Button
          type="submit"
          size="xs"
          variant="inverse"
          isLoading={isLoading}
          className="absolute border-none rounded-full cursor-pointer top-2 h-11/12 right-2 bg-gradient-to-l from-white to-transparent "
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
