import { createContext } from "react";

export type CommentRefetchContext = {
  refetch: ({}: object) => void;
  page: number;
};
export const CommentRefetchContext = createContext<CommentRefetchContext>({
  refetch: () => {},
  page: 0,
});
