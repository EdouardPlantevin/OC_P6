import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {CommentRequestInterface} from "../interfaces/comment.interface";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private pathComment = '/api/comments';
  constructor(private httpClient: HttpClient) { }

  /**
   * Creates a new comment on an article.
   * @param commentForm The comment data to create
   * @returns Promise that resolves when the comment is created
   */
  public async createComment(commentForm: CommentRequestInterface): Promise<void> {
    await firstValueFrom(this.httpClient.post<void>(this.pathComment, commentForm));
  }

}
