import {Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ArticleService } from '../../../../services/article.service';
import {DatePipe} from "@angular/common";
import {CommentComponent} from "../../../components/article/comment/comment.component";
import {CommentFormComponent} from "../../../components/article/comment-form/comment-form.component";
import {ArticleInterface} from "../../../../interfaces/article.interface";
import {CommentRequestInterface} from "../../../../interfaces/comment-request.interface";
import {CommentService} from "../../../../services/comment.service";

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
  private commentService = inject(CommentService);

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

  article = computed<ArticleInterface | undefined>(() =>
    this.articleService.articlesResource.value()?.find(({ id }) => id === this.articleId()));

  onCommentSubmitted(commentContent: string) {
    const commentForm: CommentRequestInterface = {
      articleId: this.articleId(),
      content: commentContent
    }
    this.commentService.createComment(commentForm).then(() => this.articleService.articlesResource.reload());
  }

  back() {
    window.history.back();
  }

}
