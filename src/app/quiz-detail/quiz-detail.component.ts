import { Component, OnInit } from "@angular/core";
import { StorageService } from "../service/storage.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../service/auth.service";

@Component({
  selector: "app-quiz-detail",
  templateUrl: "./quiz-detail.component.html",
  styleUrls: ["./quiz-detail.component.css"],
})
export class QuizDetailComponent implements OnInit {
  constructor(
    private sub: StorageService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {}
  id;
  q;
  store;
  quiz;
  copie;
  ans = [];
  isCoach = false;
  count = 0;
  chLength = 0;
  hide = true;
  onCheckChange(choiceGroup) {
    choiceGroup.rep = !choiceGroup.rep;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.q = this.sub.getQuiz(this.id);

    this.quiz = { ...this.q };
    this.isCoach = true ? this.auth.conCoach() : false;
  }
  onSubmit() {
    this.quiz.uid = this.auth.conUser().uid;
    this.ans = JSON.parse(localStorage.getItem("reponse")) || [];
    this.ans.push(this.quiz);
    for (const quest of this.quiz.questGroup) {
      for (const ch of quest.choiceGroup) {
        if (ch.torf === ch.rep) {
          this.count++;
        }
        this.chLength++;
      }
    }
    this.hide = !this.hide;
    this.quiz.score = this.count + "/" + this.chLength;
    localStorage.setItem("reponse", JSON.stringify(this.ans));
  }
}
