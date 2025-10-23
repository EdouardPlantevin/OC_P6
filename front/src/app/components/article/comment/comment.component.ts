import {Component, input} from '@angular/core';

@Component({
  selector: 'app-comment',
  imports: [
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  comment = input.required<{username: string, content: string}>();
}
