import { Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { DocisComponent } from './docis/docis.component';

const routes: Routes = [
  {
    path: '',
    data: {
      titulo: 'Caluladora',
      background: 'bg-success',
    },
    loadComponent: () => CalculatorComponent,
  },
  {
    path: 'docis',
    data: {
      titulo: 'Docis',
      background: 'bg-warning',
    },
    loadComponent: () => DocisComponent,
  },
];
export default routes;
