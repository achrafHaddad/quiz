import { Component, OnInit } from "@angular/core";
import { StorageService } from "../service/storage.service";

@Component({
  selector: "app-quiz-list",
  templateUrl: "./quiz-list.component.html",
  styleUrls: ["./quiz-list.component.css"],
})
export class QuizListComponent implements OnInit {
  constructor(private sub: StorageService) {}
  list;

  ngOnInit(): void {
    this.list = this.sub.getSub();
  }
}
