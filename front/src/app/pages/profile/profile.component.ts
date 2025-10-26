import {Component, computed, inject, output} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButton } from "@angular/material/button";
import { CardThemeComponent } from "../../components/card-theme/card-theme.component";
import {ThemeService} from "../../../services/theme.service";
import {RegisterRequestInterface} from "../../../interfaces/auth.interface";
import {UserService} from "../../../services/user.service";
import {SessionService} from "../../../services/session.service";

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
  private userService = inject(UserService);
  private sessionService = inject(SessionService);

  themesSubscribe = this.themeService.themesSubscribe;

  profileForm: FormGroup;
  isSubmitting = false;

  constructor() {
    const sessionData = this.sessionService.currentUser();
    const currentUsername = sessionData?.username || '';
    const currentEmail = sessionData?.email || '';

    this.profileForm = this.fb.group({
      username: [currentUsername, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: [currentEmail, [Validators.required, Validators.email]],
      password: ['', [Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]]
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const profileData: RegisterRequestInterface = {
        username: this.profileForm.value.username,
        email: this.profileForm.value.email,
        password: this.profileForm.value.password || undefined
      }

      this.userService.updateUser(profileData).then(()=> {
        this.isSubmitting = false
        this.sessionService.logOut();
      });
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
