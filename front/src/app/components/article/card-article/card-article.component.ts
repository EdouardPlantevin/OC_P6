import {Component, input} from '@angular/core';
import {ArticleInterface} from "../../../../interfaces/article.interface";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-card-article',
  imports: [
    DatePipe
  ],
  templateUrl: './card-article.component.html',
  styleUrl: './card-article.component.scss'
})
export class CardArticleComponent {
  article = input.required<ArticleInterface>();
}
