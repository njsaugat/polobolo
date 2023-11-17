import usePreviousPage from "../../user/hooks/usePreviousPage";
import PostCard from "./Post";
import getPosts from "../api/getPosts";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import Shimmer from "../../../components/Shimmer/Shimmer";
import { PostRefetchContext } from "../context/PostContext";
import { useSelector } from "react-redux";
import ShimmerCreatePost from "../../../components/Shimmer/ShimmerCreatePost";
import CreatePostDisplay from "./CreatePostDisplay";
import { Author, Post } from "../types/postType";
import { RootState } from "stores/store";
import { useParams } from "react-router-dom";

type PostsProps = {
  tag?: string;
  bookmarks?: boolean;
};

const Posts = ({ tag, bookmarks }: PostsProps) => {
  const { username } = useParams();
  usePreviousPage();
  const { isLoading, error, data, fetchNextPage, isFetchingNextPage, refetch } =
    getPosts(username, tag, bookmarks);
  useInfiniteScroll(fetchNextPage);
  const user = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );
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

  if (bookmarks && data?.pages[0].data?.bookmarkedPosts?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center justify-center w-full gap-4 gap-y-6 lg:gap-y-10">
          <h1>
            No bookmarked posts😞.
            <br /> Bookmark your first Post📑.
          </h1>
        </div>
      </div>
    );
  }

  if (data?.pages[0].data?.posts?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center justify-center w-full gap-4 gap-y-6 lg:gap-y-10">
          <CreatePostDisplay />
          <h1>
            {username === user?.account.username
              ? "👋 Create your first Post!"
              : "No Posts Available. 😞"}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center justify-center w-full gap-4 gap-y-6 lg:gap-y-10">
          {/* <CreatePost /> */}
          {(!username || username === user?.account.username) &&
            !tag &&
            !bookmarks && <CreatePostDisplay />}
          {data?.pages.map((page) => {
            if (bookmarks) {
              return page?.data?.bookmarkedPosts?.map((post: Post) => (
                <PostRefetchContext.Provider
                  value={{
                    refetch,
                    page: page.data.page,
                    postId: post._id,
                  }}
                  key={post._id}
                >
                  <PostCard post={post} />
                </PostRefetchContext.Provider>
              ));
            }

            return page?.data.posts.map((post: Post) => (
              <PostRefetchContext.Provider
                value={{
                  refetch,
                  page: page.data.page,
                  postId: post._id,
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
