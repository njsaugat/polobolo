import { Link } from "react-router-dom";
import moment from "moment";
import Avatar from "../../../features/user/Components/Avatar";
import LoadImage from "../../../components/Elements/LoadImage";

type ChatAuthorProfileProps = {
  username: string;
  url: string;
  lastMessage: string;
  sentTime: string;
  isChatSection?: boolean;
  isUserSender?: boolean;
  isGroupChat?: boolean;
};

const getTimeAgoMessage = (timestamp: string) => {
  const now = moment();
  const messageTime = moment(timestamp);
  if (messageTime.isSame(now, "day")) {
    return `${messageTime.format("h:mm A")}`;
  } else if (messageTime.isSame(now, "year")) {
    return messageTime.format("MMM D, h:mm A");
  }
  return messageTime.format("MMM D, YYYY, h:mm A");
};
const ChatAuthorProfile = ({
  username,
  url,
  lastMessage,
  isChatSection,
  isUserSender,
  sentTime,
  isGroupChat,
}: ChatAuthorProfileProps) => {
  return (
    <>
      <div
        className={`flex  ${
          isChatSection && isUserSender && "flex-row-reverse "
        } 
        ${
          isChatSection
            ? "items-end space-x-2 w-full"
            : "items-center   w-11/12"
        }      `}
      >
        {isChatSection ? (
          <Avatar
            url={url}
            className={`${
              isChatSection ? " w-8 h-8 " : " w-12 h-12 mr-4 "
            }  rounded-full`}
            username={username}
            firstName={username}
          />
        ) : (
          <LoadImage
            src={url}
            alt={`${username}'s Avatar`}
            className={`${
              isChatSection ? " w-8 h-8 " : " w-12 h-12 mr-4 rounded-full"
            } `}
          />
        )}
        <div
          className={`${isChatSection ? "  flex flex-wrap " : null}
          ${isUserSender ? "place-content-end" : null}        
        w-full`}
        >
          {!isChatSection && (
            <h2 className={`text-lg font-semibold`}>{username}</h2>
          )}
          <div
            className={`  flex ${
              isChatSection ? "flex-col" : " justify-between flex-row font-bold"
            }  ${isUserSender ? " items-end  " : null} `}
          >
            <p
              className={`${isChatSection && isUserSender ? "mx-2" : null} 
               ${
                 isChatSection
                   ? `${
                       isUserSender
                         ? "bg-gradient-to-tr from-teal-300 to-teal-500   text-white rounded-bl-full"
                         : "bg-gradient-to-b from-slate-100 to-slate-300  text-black rounded-br-full"
                     } px-4 py-2 rounded-t-full  w-auto`
                   : "text-gray-500  "
               }
              break-all

            `}
            >
              {lastMessage}
            </p>
            <span className="mr-2 text-xs ">{getTimeAgoMessage(sentTime)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatAuthorProfile;
