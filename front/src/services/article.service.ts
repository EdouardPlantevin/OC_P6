import { Injectable } from '@angular/core';
import {httpResource, HttpResourceRef} from "@angular/common/http";
import {ArticleInterface} from "../interfaces/article.interface";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  readonly articlesResource: HttpResourceRef<ArticleInterface[] | undefined> =
    httpResource<ArticleInterface[]>(() => 'assets/data/articles.json');

  getArticleBySlug(slug: string) {
    if (this.articlesResource.value === undefined) {
      return null;
    }
    return this.articlesResource.value()?.map(article => article.slug === slug ? article : null).find(article => article !== null);
  }

}
