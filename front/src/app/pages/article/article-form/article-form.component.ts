import {Component, computed, inject, output} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButton } from "@angular/material/button";
import {ArticleService} from "../../../../services/article.service";
import {Router} from "@angular/router";
import {ThemeService} from "../../../../services/theme.service";

@Component({
  selector: 'app-article-form',
  imports: [
    MatButton,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss'
})
export class ArticleFormComponent {
  private fb = inject(FormBuilder);
  private articleService = inject(ArticleService);
  private router = inject(Router);
  private themeService = inject(ThemeService);

  themes = computed(() => this.themeService.themesResource.value());

  articleForm: FormGroup;
  isSubmitting = false;

  constructor() {
    this.articleForm = this.fb.group({
      theme: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      content: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(2000)]]
    });
  }

  onSubmit(): void {
    if (this.articleForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const articleData = {
        themeId: Number(this.articleForm.value.theme),
        title: this.articleForm.value.title,
        content: this.articleForm.value.content
      };

      this.articleService.createArticle(articleData).then(() => {
        this.articleForm.reset();
        this.isSubmitting = false;
        this.router.navigate(['/articles']);
      });

    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.articleForm.controls).forEach(key => {
      const control = this.articleForm.get(key);
      control?.markAsTouched();
    });
  }

  get theme() { return this.articleForm.get('theme'); }
  get title() { return this.articleForm.get('title'); }
  get content() { return this.articleForm.get('content'); }

  back() {
    window.history.back();
  }
}
