import { createContext } from "react";

export type CommentRefetchContext = {
  refetch: ({}: object) => void;
  page: number;
  //   handleShowComments: () => void;
  //   postId: string;
};
export const CommentRefetchContext = createContext<CommentRefetchContext>({
  refetch: () => {},
  page: 0,
  //   handleShowComments: () => {},
  //   postId: "",
});
