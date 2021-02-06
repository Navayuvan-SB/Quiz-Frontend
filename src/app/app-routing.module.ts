import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminQuizDetailsComponent } from './pages/admin-quiz-details/admin-quiz-details.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { QuizDetailComponent } from './pages/quiz-detail/quiz-detail.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ResultComponent } from './pages/result/result.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'quiz', component: QuizComponent, pathMatch: 'full' },
  { path: 'quiz-detail', component: QuizDetailComponent, pathMatch: 'full' },
  { path: 'result', component: ResultComponent, pathMatch: 'full' },
  {
    path: 'admin-quiz-detail',
    component: AdminQuizDetailsComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
