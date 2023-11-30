import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "stores/store";
import { useDisclosure } from "../../../hooks/useDisclosure";
import Avatar from "../../user/Components/Avatar";
import { Author } from "../types/postType";
import CreatePost from "./CreatePost";

const CreatePostDisplay = () => {
  const { isOpen, open: openModal, close: closeModal } = useDisclosure(false);
  const { t } = useTranslation();
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
              placeholder={`${t("posts.createPost")} 💬`}
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
      <CreatePost
        isOpen={isOpen}
        openPostModal={openModal}
        closePostModal={closeModal}
      />
    </div>
  );
};

export default CreatePostDisplay;
