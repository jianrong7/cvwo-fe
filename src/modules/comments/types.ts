import { Rating } from "../ratings/types";
import { UserModel } from "../users/types";

export interface Comment {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  content: string;
  postId: number;
  userId: number;
  user: UserModel;
  upvotes: Rating[];
  downvotes: Rating[];
}
