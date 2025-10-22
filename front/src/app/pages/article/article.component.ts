import {Component, computed, effect, inject, signal} from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {MatButton} from "@angular/material/button";
import {CardArticleComponent} from "../../components/article/card-article/card-article.component";
import {ArticleService} from "../../../services/article.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-article',
  imports: [
    HeaderComponent,
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
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return this.isDesc() ? dateB - dateA : dateA - dateB;
    });
  });

  toggleSortOrder(): void {
    this.isDesc.set(!this.isDesc());
  }

}
