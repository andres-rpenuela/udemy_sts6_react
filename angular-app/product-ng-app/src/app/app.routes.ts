import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./pages/products-page/products-page.component'),
    title: 'Products'
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];
