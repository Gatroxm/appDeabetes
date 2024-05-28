import { Routes } from '@angular/router';
import SamplingListComponent from './sampling-list/sampling-list.component';
import { SamplingDetailComponent } from './sampling-detail/sampling-detail.component';
import { SamplingCreateComponent } from './sampling-create/sampling-create.component';

const routes: Routes = [
    {
        path: '',
        title: 'Muestras',
        loadComponent:() => SamplingListComponent
    },
    {
        path:'form',
        title: 'Creación Muestra',
        loadComponent: () => SamplingCreateComponent
    },
    {
        path:':id',
        title: 'Detalle de Muestra',
        loadComponent:() => SamplingDetailComponent
    },
    
];
export default routes;