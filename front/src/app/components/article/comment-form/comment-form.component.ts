import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss'
})
export class CommentFormComponent {
  private fb = inject(FormBuilder);

  commentSubmitted = output<string>();

  commentForm: FormGroup;
  isSubmitting = false;

  constructor() {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }

  onSubmit(): void {
    if (this.commentForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.commentSubmitted.emit(this.commentForm.value.content);
      this.commentForm.reset();
      this.isSubmitting = false;
    }
  }

  get content() { return this.commentForm.get('content'); }
}
