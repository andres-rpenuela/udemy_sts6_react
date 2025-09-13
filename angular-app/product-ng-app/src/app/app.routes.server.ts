import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // {
  //   path: 'products', // prerender solo la ruta válida
  //   renderMode: RenderMode.Prerender
  // },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
