export interface Avatar {
  _id: string;
  localPath: string;
  url: string;
}

export interface Account {
  _id: string;
  avatar: Avatar;
  email: string;
  username: string;
}

export type ChatUser = Account & {
  __v: number;
  createdAt: string;
  updatedAt: string;
  isEmailVerified: boolean;
  loginType: string;
  role: string;
};

export type AuthorInfo = {
  _id: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  createdAt: string;
  dob: string;
  bio: string;
  location: string;
  owner: string;
  phoneNumber: string;
  updatedAt: string;
};
export type Author = AuthorInfo & {
  account: Account;
  coverImage: CoverImage;
};

export interface CoverImage {
  _id: string;
  localPath: string;
  url: string;
}

export interface Comment {
  _id: string;
  author: Author;
  content: string;
  postId: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  likes: number;
  isLiked: boolean;
}

export type Post = {
  _id: string;
  author: Author;
  comments: number;
  content: string;
  createdAt: string;
  images: Array<{
    _id: string;
    localPath: string;
    url: string;
  }>;
  isBookmarked: boolean;
  isLiked: boolean;
  likes: number;
  tags: string[];
  updatedAt: string;
};

export interface Pagination {
  totalPosts: number;
  limit: number;
  page: number;
  totalPages: number;
  serialNumberStartFrom: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
  totalComments?: number;
}

export interface PostCardProps {
  post: Post;
}
export interface PostCardProp {
  post: Post;
}

export interface Posts {
  posts: Post[];
  bookmarkedPosts?: Post[];
}

export interface Comment {
  _id: string;
  content: string;
  postId: string;
  author: Author;
  __v: number;
  createdAt: string;
  updatedAt: string;
  likes: number;
  isLiked: boolean;
}
export interface Comments {
  comments: Comment[];
}

export type UserProfile = Author & {
  __v: number;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
};

export type FollowerProfile = Account & {
  profile: AuthorInfo & {
    coverImage: CoverImage;
    __v: number;
  };
  isFollowing: boolean;
};

export interface Chat {
  _id: string;
  name: string;
  isGroupChat: boolean;
  participants: ChatUser[];
  admin: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastMessage: ChatMessage;
}

export interface ChatMessage {
  _id: string;
  sender: Account;
  content: string;
  attachments: any[];
  chat: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
