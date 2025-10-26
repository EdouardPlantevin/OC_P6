import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {AuthGuard} from "../guards/auth.guard";
import {UnauthGuard} from "../guards/unauth.guard";

export const routes: Routes = [
    {
      path: 'connexion',
      canActivate: [UnauthGuard],
      loadComponent: async () => (await import('./pages/login/login.component')).LoginComponent
    },
    {
      path: 'inscription',
      canActivate: [UnauthGuard],
      loadComponent: async () => (await import('./pages/register/register.component')).RegisterComponent
    },
    {
      path: 'profile',
      canActivate: [AuthGuard],
      loadComponent: async () => (await import('./pages/profile/profile.component')).ProfileComponent
    },
    {
      path: 'themes',
      canActivate: [AuthGuard],
      loadComponent: async () => (await import('./pages/theme/theme.component')).ThemeComponent
    },
    {
      path: 'articles/creation',
      canActivate: [AuthGuard],
      loadComponent: async () => (await import('./pages/article/article-form/article-form.component')).ArticleFormComponent
    },
    {
      path: 'articles/:id',
      canActivate: [AuthGuard],
      loadComponent: async () => (await import('./pages/article/detail-article/detail-article.component')).DetailArticleComponent
    },
    {
      path: 'articles',
      canActivate: [AuthGuard],
      loadComponent: async () => (await import('./pages/article/article.component')).ArticleComponent
    },
    {
      path: '',
      canActivate: [UnauthGuard],
      component: HomeComponent
    },
];
