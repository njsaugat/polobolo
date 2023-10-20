import { ReactNode } from "react";
import { PostCardProp } from "../types/postType";
import AuthorProfile from "../../user/Components/AuthorProfile";

type PostAuthor = {
  className?: string;
  children: ReactNode;
};
const PostAuthor = ({
  post,
  className,
  children,
}: PostCardProp & PostAuthor) => {
  return (
    <div className={` ${className}`}>
      <AuthorProfile
        username={post?.author?.account?.username}
        url={post.author.account.avatar.url}
        firstName={post.author.firstName}
        lastName={post.author.lastName}
        bio={post.author.bio}
      />

      {children}
    </div>
  );
};

export default PostAuthor;
