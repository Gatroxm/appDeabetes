import { Routes } from "@angular/router";
import { NewsComponent } from "./news/news.component";
import { NewsDetailComponent } from "./news-detail/news-detail.component";
import { NewsCreateComponent } from "./news-create/news-create.component";

const routes: Routes = [

    {
        path:'',
        data:{
            title: 'Noticias',
            background:'bg-success-subtle'
        },
        loadComponent: ()=> NewsComponent
    },
    {
        path:'form',
        data:{
            title: 'Crear notica',
            background:'bg-success-subtle'
        },
        loadComponent: ()=> NewsCreateComponent
    },
    {
        path:'form/:id',
        data:{
            title: 'Editar notica',
            background:'bg-success-subtle'
        },
        loadComponent: ()=> NewsCreateComponent
    },
    {
        path:':id',
        data:{
            title: 'Detalle de notica',
            background:'bg-success-subtle'
        },
        loadComponent: ()=> NewsDetailComponent
    },
    

];

export default routes;