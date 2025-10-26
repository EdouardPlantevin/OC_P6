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

}
