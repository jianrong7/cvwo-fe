import { UserData } from "../users/types";

export interface Comment {
  // type Comment struct {
  //   gorm.Model
  //   Content string `json:"content"`
  //   // Replies []*Comment `gorm:"many2many:replies"`
  //   PostID uint `gorm:"not null;" json:"postId"`
  //   Post Post `json:"post"`
  //   UserID uint `json:"userId"`
  //   User User `json:"user"`
  // }
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  content: string;
  postId: number;
  userId: number;
  user: UserData;
}
