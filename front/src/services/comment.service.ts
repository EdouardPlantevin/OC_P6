import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {CommentRequestInterface} from "../interfaces/comment-request.interface";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private pathComment = '/api/comments';
  constructor(private httpClient: HttpClient) { }

  public async createComment(commentForm: CommentRequestInterface): Promise<void> {
    await firstValueFrom(this.httpClient.post<void>(this.pathComment, commentForm));
  }

}
