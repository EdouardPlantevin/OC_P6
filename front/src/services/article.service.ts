import { Injectable } from '@angular/core';
import {HttpClient, httpResource, HttpResourceRef} from "@angular/common/http";
import {ArticleInterface, ArticleRequestInterface} from "../interfaces/article.interface";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private pathArticle = '/api/articles';

  constructor(private httpClient: HttpClient) { }

  readonly articlesResource: HttpResourceRef<ArticleInterface[] | undefined> =
    httpResource<ArticleInterface[]>(() => this.pathArticle);

  /**
   * Creates a new article.
   * @param articleForm The article data to create
   * @returns Promise that resolves when the article is created
   */
  public async createArticle(articleForm: ArticleRequestInterface): Promise<void> {
    await firstValueFrom(this.httpClient.post<void>(this.pathArticle, articleForm));
    this.articlesResource.reload();
  }
}
