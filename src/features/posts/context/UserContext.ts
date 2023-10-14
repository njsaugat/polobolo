import { createContext } from "react";
import { Author } from "../types/postType";

export type UserContext = {
  user: Author | undefined;
};
export const UserContext = createContext<UserContext>({
  user: undefined,
});
