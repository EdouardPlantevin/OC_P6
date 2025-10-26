import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {AuthService} from "../../../services/auth.service";
import {RegisterRequestInterface} from "../../../interfaces/auth.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
    imports: [
        MatButton,
        ReactiveFormsModule
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  registerForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]]
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} est requis`;
    }
    if (field?.hasError('email')) {
      return 'Format d\'email invalide';
    }
    if (field?.hasError('pattern') && fieldName === 'password') {
      return 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un caractère spécial';
    }
    return '';
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      username: 'Nom d\'utilisateur',
      email: 'Adresse e-mail',
      password: 'Mot de passe'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        const registerData = this.registerForm.value as RegisterRequestInterface;
        await this.authService.register(registerData);
        await this.router.navigateByUrl('/connexion');
      } catch (error: any) {
        if (error.status === 400) {
          this.errorMessage = 'Les informations fournies ne sont pas valides';
        } else if (error.status === 409) {
          this.errorMessage = 'Cet email ou nom d\'utilisateur est déjà utilisé';
        } else {
          this.errorMessage = 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.';
        }
      } finally {
        this.isLoading = false;
      }
    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
  }

  back() {
    window.history.back();
  }

}
