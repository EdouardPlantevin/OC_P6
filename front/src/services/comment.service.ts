import { Injectable } from '@angular/core';
import {HttpClient, httpResource, HttpResourceRef} from "@angular/common/http";
import {ArticleInterface} from "../interfaces/article.interface";
import {ArticleRequestInterface} from "../interfaces/article-request.interface";
import {firstValueFrom} from "rxjs";
import {CommentRequestInterface} from "../interfaces/comment-request.interface";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private pathComment = '/api/comments';

  constructor(private httpClient: HttpClient) { }


  public async createComment(commentForm: CommentRequestInterface): Promise<void> {
    console.log('Creating comment:', commentForm);
    await firstValueFrom(this.httpClient.post<void>(this.pathComment, commentForm));
  }

}
