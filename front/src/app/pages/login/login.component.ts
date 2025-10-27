import { Component, inject, OnInit } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SessionService } from '../../../services/session.service';
import {LoginRequestInterface} from "../../../interfaces/auth.interface";
import {AuthService} from "../../../services/auth.service";
import {SessionInterface} from "../../../interfaces/session.interface";

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
  errorMessage = '';

  private sessionService = inject(SessionService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
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
      login: 'E-mail ou nom d\'utilisateur',
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
      this.errorMessage = '';

      try {
          const loginRequest = this.loginForm.value as LoginRequestInterface;
          const sessionInformation: SessionInterface = await this.authService.login(loginRequest);
          this.sessionService.logIn(sessionInformation);
          await this.router.navigateByUrl('/articles');
      } catch (error: any) {
        console.error('Erreur lors de la connexion:', error);

        // Gérer les erreurs HTTP
        if (error.status === 401 || error.status === 403) {
          this.errorMessage = 'E-mail ou utilisateur ou mot de passe ne sont pas bons';
        } else if (error.status === 0) {
          this.errorMessage = 'Impossible de se connecter au serveur. Vérifiez votre connexion.';
        } else {
          this.errorMessage = 'Une erreur est survenue lors de la connexion. Veuillez réessayer.';
        }
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
    this.router.navigateByUrl('/');
  }
}
