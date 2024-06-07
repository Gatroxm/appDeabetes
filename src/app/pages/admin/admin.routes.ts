import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { SamplingService } from '@services/sampling.service';
import { ExcelService } from '@services/excel.service';
import { UiService } from '@services/ui.service';
import { LoginService } from '@services/login.service';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { NewsService } from '@services/news.service';
import { UserService } from '@services/user.service';
import { ImagesService } from '@services/images.service';
import { QuizService } from '@services/quiz.service';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    providers: [UiService, LoginService, UserService, ImagesService],
    children: [
      {
        path: '',
        data: {
          titulo: 'Inicio',
        },
        component: DashboardComponent,
      },
      {
        path: 'calculator',
        loadChildren: () => import('@pages/calculator/calculator.routes'),
      },
      {
        path: 'sampling',
        providers: [SamplingService, ExcelService],
        loadChildren: () => import('@pages/sampling/sampling.routes'),
      },
      {
        path: 'news',
        providers: [NewsService],
        loadChildren: () => import('@pages/news/news.routes'),
      },
      {
        path: 'user',
        providers: [UserService, SamplingService],
        loadChildren: () => import('@pages/user/user.routes'),
      },
      {
        path: 'quiz',
        providers: [QuizService],
        loadChildren: () => import('@pages/quiz/quiz.routes'),
      },
    ],
  },
];

export default routes;
