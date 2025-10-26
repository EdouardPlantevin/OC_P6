export interface ArticleInterface {
  id: number;
  title: string;
  createdAt: Date;
  content: string;
  theme: string;
  author: {
    username: string;
  };
  comments?: Array<{
    content: string;
    createdAt: Date;
    author: string;
  }>;
}
