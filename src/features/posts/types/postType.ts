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

export interface Author {
  account: Account;
  coverImage: CoverImage;
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
}

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
}

export interface PostCardProps {
  post: Post;
  // page: number;
}
export interface PostCardProp {
  post: Post;
}

export interface Posts {
  posts: Post[];
}

export interface Comment {
  _id: string;
  content: string;
  postId: string;
  author: Author; // You need to define Author type separately
  __v: number;
  createdAt: string;
  updatedAt: string;
  likes: number;
  isLiked: boolean;
}
export interface Comments {
  comments: Comment[];
}
