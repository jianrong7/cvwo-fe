export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  upvotes: number;
  downvotes: number;
  tags: string[];
  CreatedAt: Date;
  UpdatedAt: Date;
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
  order: string;
}
