export interface CommentInterface {
  content: string;
  createdAt: Date;
  author: string;
}

export interface CommentRequestInterface {
  content: string;
  articleId: number;
}
