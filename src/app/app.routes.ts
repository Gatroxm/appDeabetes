import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import  LogInComponent  from '@pages/auth/log-in/log-in.component';

const routes: Routes = [
    {
        path:'',
        canActivate:[authGuard],
        loadChildren: () => import('@pages/admin/admin.routes')
    },
    {
        path:'login',
        loadComponent:()=> LogInComponent
    },
    
    
    {
        path: '**',
        redirectTo: ''
    }
];

export default routes;