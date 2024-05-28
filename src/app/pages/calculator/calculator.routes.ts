import { Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';

const routes: Routes = [
    {
        path: '',
        title: 'Calculadora',
        loadComponent:() => CalculatorComponent
    }
];
export default routes;