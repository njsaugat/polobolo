import { createContext } from "react";

export type PostRefetchContext = {
  refetch: ({}: object) => void;
  page: number;
  postId: string;
};
export const PostRefetchContext = createContext<PostRefetchContext>({
  refetch: () => {},
  page: 0,
  postId: "",
});
