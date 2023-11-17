import { Author, Chat } from "features/posts/types/postType";

export const getChatObjectMetadata = (
  chat: Chat,
  loggedInUser: Author | undefined
) => {
  const lastMessage = chat.lastMessage?.content
    ? chat.lastMessage?.content
    : chat.lastMessage
    ? `${chat.lastMessage?.attachments?.length} attachment${
        chat.lastMessage.attachments.length > 1 ? "s" : ""
      }`
    : "No messages yet";

  if (chat.isGroupChat) {
    return {
      avatar: "https://via.placeholder.com/100x100.png",
      title: chat.name,
      description: `${chat.participants.length} members in the chat`,
      lastMessage: chat.lastMessage
        ? chat.lastMessage?.sender?.username + ": " + lastMessage
        : lastMessage,
    };
  } else {
    const participant = chat.participants.find(
      (p) => p._id !== loggedInUser?.account._id
    );
    return {
      avatar: participant?.avatar.url,
      title: participant?.username,
      description: participant?.email,
      lastMessage,
    };
  }
};
