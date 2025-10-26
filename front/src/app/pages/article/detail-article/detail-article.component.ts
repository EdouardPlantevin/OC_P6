import {Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ArticleService } from '../../../../services/article.service';
import {DatePipe} from "@angular/common";
import {CommentComponent} from "../../../components/article/comment/comment.component";
import {CommentFormComponent} from "../../../components/article/comment-form/comment-form.component";

@Component({
  selector: 'app-detail-article',
  standalone: true,
  imports: [DatePipe, CommentComponent, CommentFormComponent],
  templateUrl: './detail-article.component.html',
  styleUrl: './detail-article.component.scss'
})
export class DetailArticleComponent {

  articleId = signal<number>(0);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private articleService = inject(ArticleService);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      const idParam = params['id'];
      const id = +idParam;

      if (!isNaN(id)) {
        this.articleId.set(id);
      } else {
        this.router.navigateByUrl('/articles');
      }
    });
  }

  article = computed(() =>
    this.articleService.articlesResource.value()?.find(({ id }) => id === this.articleId()));


  back() {
    window.history.back();
  }

  onCommentSubmitted(content: string) {
    console.log('Commentaire :', content);
  }



}
