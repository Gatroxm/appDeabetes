import { Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {
    path: '',
    title: 'Usuarios',
    data: {
      title: 'Mi perfil',
      background: 'bg-primary',
    },
    loadComponent: () => UserDetailComponent,
  },
];
export default routes;
