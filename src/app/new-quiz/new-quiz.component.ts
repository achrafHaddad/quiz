import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { StorageService } from "../service/storage.service";
import { AuthService } from "../service/auth.service";

@Component({
  selector: "app-new-quiz",
  templateUrl: "./new-quiz.component.html",
  styleUrls: ["./new-quiz.component.css"],
})
export class NewQuizComponent implements OnInit {
  constructor(private sub: StorageService, private auth: AuthService) {}
  quizForm;
  uid;

  get questGroup() {
    return new FormGroup({
      question: new FormControl(""),
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
    this.uid = this.auth.conUser().uid;
    this.quizForm = new FormGroup({
      title: new FormControl(""),
      questGroup: new FormArray([this.questGroup]),
      cid: new FormControl(this.uid),
    });
  }
  submit() {
    this.sub.setSub(this.quizForm.value);
    this.quizForm.reset();
  }
}
