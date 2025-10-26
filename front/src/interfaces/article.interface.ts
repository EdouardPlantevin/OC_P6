import {CommentInterface} from "./comment.interface";

export interface ArticleInterface {
  id: number;
  title: string;
  createdAt: Date;
  content: string;
  theme: string;
  author: {
    username: string;
  };
  comments: CommentInterface[];
}
