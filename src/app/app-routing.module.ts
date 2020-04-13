import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewQuizComponent } from "./new-quiz/new-quiz.component";
import { QuizListComponent } from "./quiz-list/quiz-list.component";
import { QuizDetailComponent } from "./quiz-detail/quiz-detail.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthgGuard } from "./authg.guard";
import { AuthcoachGuard } from "./authcoach.guard";
import { StudAnsComponent } from "./stud-ans/stud-ans.component";
import { StudListComponent } from "./stud-list/stud-list.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", canActivate: [AuthgGuard], component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "newQuiz",
    canActivate: [AuthgGuard, AuthcoachGuard],
    component: NewQuizComponent,
  },
  {
    path: "newQuiz/:id",
    canActivate: [AuthgGuard, AuthcoachGuard],
    component: NewQuizComponent,
  },
  {
    path: "quizList",
    canActivate: [AuthgGuard, AuthcoachGuard],
    component: QuizListComponent,
  },
  {
    path: "myQuiz/:id",
    canActivate: [AuthgGuard],
    component: StudAnsComponent,
  },
  {
    path: "myList",
    canActivate: [AuthgGuard],
    component: StudListComponent,
  },
  {
    path: "quiz/:id",
    canActivate: [AuthgGuard],
    component: QuizDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
