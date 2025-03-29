import { Routes } from '@angular/router';
import { CreateLetterComponent } from './features/create/create.component';
import { LetterListComponent } from './features/list/letter-list.component';

export const routes: Routes = [
  {
    path: 'create',
    component: CreateLetterComponent,
    data: { navbarVariant: 'full', mode: 'create' },
  },
  {
    path: 'edit',
    component: CreateLetterComponent,
    data: { navbarVariant: 'full', mode: 'edit' },
  },
  {
    path: 'list',
    component: LetterListComponent,
    data: { navbarVariant: 'limited' },
  },
  { path: '**', redirectTo: 'list' }
];
