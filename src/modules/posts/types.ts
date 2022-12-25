import { Rating } from "../ratings/types";
import { UserModel } from "../users/types";

export interface Post {
  ID: number;
  title: string;
  content: string;
  userId: number;
  upvotes: Rating[];
  downvotes: Rating[];
  tags: string[];
  CreatedAt: Date;
  UpdatedAt: Date;
  user: UserModel;
  // gorm.Model
  // Title string
  // Body string
  // // Tags pq.StringArray `gorm:type:text[]"`
  // UserId uint
  // User User `gorm:"foreignKey:UserId"`
  // Upvotes uint
  // Downvotes uint
  // Comments []Comment
}

export interface PostQueryParams {
  tags: string;
  sort: string;
  search: string;
}
