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
      path: 'themes',
      loadComponent: async () => (await import('./pages/theme/theme.component')).ThemeComponent
    },
    {
      path: 'articles/:slug',
      loadComponent: async () => (await import('./pages/article/detail-article/detail-article.component')).DetailArticleComponent
    },
    {
      path: 'articles',
      loadComponent: async () => (await import('./pages/article/article.component')).ArticleComponent
    },
    {
      path: '',
      component: HomeComponent
    },
];
