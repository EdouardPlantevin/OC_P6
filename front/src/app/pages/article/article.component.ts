import {Component, computed, effect, inject, signal} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {CardArticleComponent} from "../../components/article/card-article/card-article.component";
import {ArticleService} from "../../../services/article.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-article',
  imports: [
    MatButton,
    CardArticleComponent,
    RouterLink
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  articleService = inject(ArticleService);

  isDesc = signal(true);

  articles = computed(() => {
    const dataArticles = this.articleService.articlesResource.value() || [];

    return dataArticles.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return this.isDesc() ? dateB - dateA : dateA - dateB;
    });
  });

  constructor() {
    effect(() => {
      console.log(this.articles());
    });
  }

  toggleSortOrder(): void {
    this.isDesc.set(!this.isDesc());
  }

}
