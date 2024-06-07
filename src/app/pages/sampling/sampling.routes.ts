import { Routes } from '@angular/router';
import SamplingListComponent from './sampling-list/sampling-list.component';
import { SamplingDetailComponent } from './sampling-detail/sampling-detail.component';
import { SamplingCreateComponent } from './sampling-create/sampling-create.component';

const routes: Routes = [
    {
        path: '',
        title: 'Muestras',
        data:{
            title:'Listado de muestras',
            background:'bg-warning'
        },
        loadComponent:() => SamplingListComponent
    },
    {
        path:'form',
        data:{
            title:'Creación Muestra',
            background:'bg-warning'
        },
        loadComponent: () => SamplingCreateComponent
    },
    {
        path:':id',
        data:{
            title:'Detalle de Muestra',
            background:'bg-warning'
        },
        loadComponent:() => SamplingDetailComponent
    },
    
];
export default routes;