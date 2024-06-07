import { Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';

const routes: Routes = [
    {
        path: '',
        data:{
            titulo:'Caluladora',
            background:'bg-success'
        },
        loadComponent:() => CalculatorComponent
    }
];
export default routes;