import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'cats/breeds', pathMatch: 'full' },

  {
    path: 'cats',
    children: [
      { path: 'breeds', loadComponent: () => import('./features/cats/pages/breeds/breeds.page').then(m => m.BreedsPage) },
      { path: 'breeds-table', loadComponent: () => import('./features/cats/pages/breeds-table/breeds-table.page').then(m => m.BreedsTablePage) },
      { path: '', redirectTo: 'breeds', pathMatch: 'full' }
    ]
  },

  {
    path: 'auth',
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/pages/login/login.page').then(m => m.LoginPage) },
      { path: 'register', loadComponent: () => import('./features/auth/pages/register/register.page').then(m => m.RegisterPage) },
      { path: 'me', canActivate: [authGuard], loadComponent: () => import('./features/auth/pages/me/me.page').then(m => m.MePage) },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'cats/breeds' }
];
