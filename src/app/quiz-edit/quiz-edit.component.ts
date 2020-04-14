import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { StorageService } from "../service/storage.service";
import { AuthService } from "../service/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-quiz-edit",
  templateUrl: "./quiz-edit.component.html",
  styleUrls: ["./quiz-edit.component.css"],
})
export class QuizEditComponent implements OnInit {
  constructor(
    private sub: StorageService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  quizForm;
  uid;
  id;
  qid;
  quiz;
  questionsForm = new FormArray([]);
  chGroup = new FormArray([]);

  get questGroup() {
    return new FormGroup({
      question: new FormControl(),
      choiceGroup: new FormArray([this.choiceGroup]),
    });
  }
  get questions() {
    return this.quizForm.get("questGroup") as FormArray;
  }
  get choiceGroup() {
    return new FormGroup({
      torf: new FormControl(false),
      rep: new FormControl(false),
      choice: new FormControl(""),
    });
  }

  addQuest() {
    (this.quizForm.get("questGroup") as FormArray).push(this.questGroup);
  }
  delquest(i) {
    (this.quizForm.get("questGroup") as FormArray).removeAt(i);
  }

  addChoice(q) {
    q.get("choiceGroup").push(this.choiceGroup);
  }
  delChoice(q, i) {
    q.get("choiceGroup").removeAt(i);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.uid = this.auth.conUser().uid;
    this.quiz = this.sub.getQuiz(this.id);
    this.qid = this.quiz.qid;

    for (let quest of this.quiz.questGroup) {
      for (let ch of quest.choiceGroup) {
        this.chGroup.push(
          new FormGroup({
            torf: new FormControl(ch.torf),
            rep: new FormControl(ch.rep),
            choice: new FormControl(ch.choice),
          })
        );
      }
      this.questionsForm.push(
        new FormGroup({
          question: new FormControl(quest.question),
          choiceGroup: this.chGroup,
        })
      );
    }

    this.quizForm = new FormGroup({
      title: new FormControl(this.quiz.title),
      questGroup: this.questionsForm,
      cid: new FormControl(this.uid),
    });
  }
  edit() {
    this.quiz = this.quizForm.value;
    this.quiz.qid = this.qid;
    this.sub.editQuiz(this.id, this.quiz);
  }
  delete(id) {
    this.sub.delete(id);
    this.router.navigate(["/home"]);
  }
}
