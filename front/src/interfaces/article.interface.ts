export interface ArticleInterface {
  id: number;
  slug: string;
  title: string;
  description: string;
  date: Date;
  theme: string;
  author: string;
  comments: [{
    username: string;
    content: string;
  }];
}
