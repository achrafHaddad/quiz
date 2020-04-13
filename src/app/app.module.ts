import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { NewQuizComponent } from "./new-quiz/new-quiz.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { QuizListComponent } from "./quiz-list/quiz-list.component";
import { QuizDetailComponent } from "./quiz-detail/quiz-detail.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { StudAnsComponent } from "./stud-ans/stud-ans.component";
import { StudListComponent } from "./stud-list/stud-list.component";
import { FilterPipe } from "./service/search.pipe";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NewQuizComponent,
    QuizListComponent,
    QuizDetailComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    StudAnsComponent,
    StudListComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    NgbModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
