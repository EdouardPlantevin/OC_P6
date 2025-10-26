import {Component, computed, inject, output} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButton } from "@angular/material/button";
import { CardThemeComponent } from "../../components/card-theme/card-theme.component";
import { ThemeInterface } from "../../../interfaces/theme.interface";
import {subscribeOn} from "rxjs";
import {ThemeService} from "../../../services/theme.service";

@Component({
  selector: 'app-profile',
  imports: [
    MatButton,
    CardThemeComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private fb = inject(FormBuilder);
  private themeService = inject(ThemeService);

  themesSubscribe = this.themeService.themesSubscribe;

  profileUpdated = output<{ username: string; email: string; password?: string }>();

  profileForm: FormGroup;
  isSubmitting = false;

  constructor() {
    this.profileForm = this.fb.group({
      username: ['username', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['email@test.com', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const profileData = {
        username: this.profileForm.value.username,
        email: this.profileForm.value.email,
        password: this.profileForm.value.password || undefined
      };

      this.profileUpdated.emit(profileData);

      this.profileForm.patchValue({ password: '' });
      this.isSubmitting = false;
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.profileForm.controls).forEach(key => {
      const control = this.profileForm.get(key);
      control?.markAsTouched();
    });
  }

  // Getters pour faciliter l'accès aux contrôles dans le template
  get username() { return this.profileForm.get('username'); }
  get email() { return this.profileForm.get('email'); }
  get password() { return this.profileForm.get('password'); }


  async unsubscribe(id: number) {
    await this.themeService.toggleSubscription(id);
  }

}
