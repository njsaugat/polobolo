import usePreviousPage from "../../home/hooks/usePreviousPage";
import PostCard from "./Post";
import getPosts from "../api/getPosts";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { Spinner } from "../../../components/Elements/Spinner";
import Shimmer from "../../../components/Elements/Shimmer";
import { PostRefetchContext } from "../context/PostContext";
import getUser from "../../home/api/getUser";
import CreatePost from "./CreatePost";
import { useDispatch } from "react-redux";
import { addUser } from "../../../stores/userSlice";
import ShimmerCreatePost from "../../../components/Elements/ShimmerCreatePost";
import CreatePostDisplay from "./CreatePostDisplay";
import { Post } from "../types/postType";

type PostsProps = {
  username?: string;
};

const Posts = ({ username }: PostsProps) => {
  usePreviousPage();
  const { isLoading, error, data, fetchNextPage, isFetchingNextPage, refetch } =
    getPosts(username);
  useInfiniteScroll(fetchNextPage);
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 overflow-hidden ">
        {/* <CreatePost /> */}
        <div className="w-11/12 p-4 bg-white rounded-lg shadow-2xl drop- md:w-3/5 lg:w-1/2">
          <ShimmerCreatePost />
        </div>
        {new Array(6).fill(1).map((value, index) => (
          <div
            key={value + index}
            className="w-11/12 p-4 bg-white rounded-lg shadow-2xl drop- md:w-3/5 lg:w-1/2"
          >
            <Shimmer />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center justify-center w-full gap-4 gap-y-6 lg:gap-y-10">
          {/* <CreatePost /> */}
          <CreatePostDisplay />
          {/* <CreatePost /> */}
          {/* </CreatePostDisplay> */}
          {data?.pages.map((page) => {
            return page?.data.posts.map((post: Post) => (
              <PostRefetchContext.Provider
                value={{
                  refetch,
                  page: page.data.page,
                  postId: post._id,
                  // user: userData?.data,
                }}
                key={post._id}
              >
                <PostCard post={post} />
              </PostRefetchContext.Provider>
            ));
          })}
        </div>
      </div>
      {isFetchingNextPage && (
        <div className="flex flex-col items-center justify-center gap-3 mt-10 overflow-hidden ">
          {new Array(6).fill(1).map((value, index) => (
            <div
              key={value + index}
              className="w-11/12 p-4 bg-white rounded-lg shadow-2xl drop- md:w-3/5 lg:w-1/2 gap-y-10"
            >
              <Shimmer />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
