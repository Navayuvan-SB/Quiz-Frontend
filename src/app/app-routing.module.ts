import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { CommonGuard } from './guards/common.guard';
import { LoginGuard } from './guards/login.guard';
import { UserGaurdGuard } from './guards/user-gaurd.guard';
import { AdminQuizDetailsComponent } from './pages/admin-quiz-details/admin-quiz-details.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { QuizDetailComponent } from './pages/quiz-detail/quiz-detail.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ResultComponent } from './pages/result/result.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [CommonGuard],
  },
  {
    path: 'quiz/:id',
    component: QuizComponent,
    pathMatch: 'full',
    canActivate: [UserGaurdGuard],
  },
  {
    path: 'quiz-detail/:id',
    component: QuizDetailComponent,
    pathMatch: 'full',
    canActivate: [UserGaurdGuard],
  },
  {
    path: 'result/:id',
    component: ResultComponent,
    pathMatch: 'full',
    canActivate: [UserGaurdGuard],
  },
  {
    path: 'admin-quiz-detail/:id',
    component: AdminQuizDetailsComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
