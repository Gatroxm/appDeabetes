import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import LogInComponent from '@pages/auth/log-in/log-in.component';
import { UserService } from '@services/user.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () =>
      import('@pages/admin/admin.routes').then((m) => m.default),
  },
  {
    path: 'login',
    providers: [UserService],
    loadComponent: () => LogInComponent,
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];

export default routes;
