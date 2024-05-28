import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { SamplingService } from '@services/sampling.service';
import { ExcelService } from '@services/excel.service';
import { UiService } from '@services/ui.service';
import { LoginService } from '@services/login.service';
import { DashboardComponent } from '@components/dashboard/dashboard.component';

const routes: Routes = [
    {
        path:'',
        component: AdminLayoutComponent,
        providers:[UiService, LoginService],
        children:[
            {
                path:'',
                title: 'home',
                data:{
                    titulo:'Inicio'
                },
                component: DashboardComponent
            },
            {
                path:'calculator',
                title: 'Caluladora',
                data:{
                    titulo:'Caluladora'
                },
                loadChildren: () => import('@pages/calculator/calculator.routes')
            },
            {
                path:'sampling',
                title: 'Sampling',
                data:{
                    titulo:'Muestras'
                },
                providers:[SamplingService, ExcelService],
                loadChildren: () => import('@pages/sampling/sampling.routes')
            },
        ]

    }
];

export default routes;