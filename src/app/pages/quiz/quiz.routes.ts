import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    title: 'Quiz',
    data: {
      title: 'Listado de Examenes Médicos',
      background: 'bg-warning',
    },
    loadComponent: () =>
      import('./quiz-list/quiz-list.component').then(
        (m) => m.QuizListComponent
      ),
  },
  {
    path: 'form',
    data: {
      title: 'Creación de Quiz',
      background: 'bg-warning',
    },
    loadComponent: () =>
      import('./quiz-create/quiz-create.component').then(
        (m) => m.QuizCreateComponent
      ),
  },
];
export default routes;
