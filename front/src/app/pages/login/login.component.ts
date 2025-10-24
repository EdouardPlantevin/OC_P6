import { Component, inject, OnInit } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-login',
  imports: [
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;

  private sessionService = inject(SessionService);

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} est requis`;
    }
    if (field?.hasError('email')) {
      return 'Format d\'email invalide';
    }
    return '';
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      username: 'E-mail ou nom d\'utilisateur',
      password: 'Mot de passe'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      const { username, password } = this.loginForm.value;

      try {
        const success = await this.sessionService.logIn(username, password);

        if (success) {
          console.log('Connexion réussie !');
          this.router.navigate(['/articles']);
        } else {
          console.log('Échec de la connexion');
        }
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
      } finally {
        this.isLoading = false;
      }
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
      console.log('Formulaire invalide');
    }
  }

  back() {
    window.history.back();
  }
}
