import { Injectable } from '@angular/core';
import {HttpClient, httpResource, HttpResourceRef} from "@angular/common/http";
import {ArticleInterface} from "../interfaces/article.interface";
import {firstValueFrom} from "rxjs";
import {ArticleRequestInterface} from "../interfaces/article-request.interface";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private pathArticle = '/api/articles';

  constructor(private httpClient: HttpClient) { }

  readonly articlesResource: HttpResourceRef<ArticleInterface[] | undefined> =
    httpResource<ArticleInterface[]>(() => this.pathArticle);

  public async createArticle(articleForm: ArticleRequestInterface): Promise<void> {
    await firstValueFrom(this.httpClient.post<void>(this.pathArticle, articleForm));
    this.articlesResource.reload();
  }
}
