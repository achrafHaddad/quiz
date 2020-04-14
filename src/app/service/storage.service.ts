import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}
  quiz;
  setSub(f) {
    let rand = Math.floor(Math.random() * 1000);
    f.qid = rand;
    let quiz = JSON.parse(localStorage.getItem("quiz")) || [];
    quiz.push(f);
    localStorage.setItem("quiz", JSON.stringify(quiz));
  }

  getSub() {
    return JSON.parse(localStorage.getItem("quiz"));
  }
  getQuiz(id) {
    this.quiz = JSON.parse(localStorage.getItem("quiz"));
    return this.quiz[id];
  }
  editQuiz(id, quizForm) {
    let quiz = JSON.parse(localStorage.getItem("quiz"));
    quiz[id] = quizForm;
    localStorage.setItem("quiz", JSON.stringify(quiz));
  }
  delete(id) {
    let quiz = this.getSub();
    quiz.splice(id, 1);
    localStorage.setItem("quiz", JSON.stringify(quiz));
  }
}
