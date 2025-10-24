import {Component, computed, inject, Signal} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../../services/article.service';
import {ArticleInterface} from "../../../../interfaces/article.interface";
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
  private route = inject(ActivatedRoute);
  private articleService = inject(ArticleService);

  article: Signal<ArticleInterface | null> = computed<ArticleInterface | null>(() => {
    return this.articleService.getArticleBySlug(this.route.snapshot.paramMap.get('slug') ?? '') ?? null;
  });

  back() {
    window.history.back();
  }

  onCommentSubmitted(content: string) {
    console.log('Commentaire :', content);
  }
}
