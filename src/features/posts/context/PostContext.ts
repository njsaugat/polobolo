import { createContext } from "react";
import { Author } from "../types/postType";

export type PostRefetchContext = {
  refetch: ({}: object) => void;
  page: number;
  postId: string;
  // user: Author | undefined;
};
export const PostRefetchContext = createContext<PostRefetchContext>({
  refetch: () => {},
  page: 0,
  postId: "",
  // user/: undefined,
});
