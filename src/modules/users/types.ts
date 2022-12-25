import { Comment } from "../comments/types";
import { Post } from "../posts/types";
import { Rating } from "../ratings/types";

export interface UserLoginOutput {
  token?: string;
  username?: string;
  ID?: string;
  profilePicture?: string;
}

export interface UserModel {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
  username: string;
  posts: Post[];
  comments: Comment[];
  ratings: Rating[];
  profilePicture: string;
}
