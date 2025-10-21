import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
      path: 'connexion',
      loadComponent: async () => (await import('./pages/login/login.component')).LoginComponent
    },
    {
      path: 'inscription',
      loadComponent: async () => (await import('./pages/register/register.component')).RegisterComponent
    },
    {
      path: 'theme',
      loadComponent: async () => (await import('./pages/theme/theme.component')).ThemeComponent
    },
    {
      path: '',
      component: HomeComponent
    },
];
