import { Comment } from "../comments/types";
import { Post } from "../posts/types";
import { Rating } from "../ratings/types";

export interface UserData {
  ID: number;
  name: string;
  username: string;
  claims?: {
    exp?: number;
    sub?: number;
  };
}

export interface UserLoginOutput {
  token: string;
  username: string;
  ID: string;
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
}
