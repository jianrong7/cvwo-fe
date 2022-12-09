export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  upvotes: number;
  downvotes: number;
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
