import {Component, input} from '@angular/core';
import {CommentInterface} from "../../../../interfaces/comment.interface";

@Component({
  selector: 'app-comment',
  imports: [
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  comment = input.required<CommentInterface>();
}
