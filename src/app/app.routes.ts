import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: 'lista',
    loadComponent: () =>
      import('./components/character-list/character-list.component').then(
        (m) => m.CharacterListComponent,
      ),
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    component: HomeComponent,
  },
];
