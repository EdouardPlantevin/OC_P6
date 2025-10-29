import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-articles-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: []
})
export class ArticlesLayoutComponent implements OnInit {
  private articleService = inject(ArticleService);

  ngOnInit(): void {
    this.articleService.articlesResource.value();
  }
}

