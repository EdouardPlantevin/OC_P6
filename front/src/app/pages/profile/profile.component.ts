import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButton } from "@angular/material/button";
import { CardThemeComponent } from "../../components/card-theme/card-theme.component";
import { ThemeInterface } from "../../../interfaces/theme.interface";

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

  mockThemes: ThemeInterface[] = [
    {
      id: 1,
      title: 'Theme 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non erat id nisi consequat eleifend sed vitae augue. Phasellus maximus sit amet neque et sagittis. Integer pharetra non velit ut dignissim. Praesent quis iaculis turpis, nec volutpat tortor. Pellentesque ac tristique dolor, sed maximus metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed suscipit dui in tempus posuere.',
      subscribe: false
    },
    {
      id: 3,
      title: 'Theme 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non erat id nisi consequat eleifend sed vitae augue. Phasellus maximus sit amet neque et sagittis. Integer pharetra non velit ut dignissim. Praesent quis iaculis turpis, nec volutpat tortor. Pellentesque ac tristique dolor, sed maximus metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed suscipit dui in tempus posuere.',
      subscribe: true
    },
    {
      id: 4,
      title: 'Theme 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non erat id nisi consequat eleifend sed vitae augue. Phasellus maximus sit amet neque et sagittis. Integer pharetra non velit ut dignissim. Praesent quis iaculis turpis, nec volutpat tortor. Pellentesque ac tristique dolor, sed maximus metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed suscipit dui in tempus posuere.',
      subscribe: true
    }
  ]

  toggleSubscribe(id: number, action: boolean) {
    console.log("Change theme id " + id + " subscribe to " + action)
  }
}
