import { Component, OnInit } from "@angular/core";
import { StorageService } from "../service/storage.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../service/auth.service";

@Component({
  selector: "app-stud-ans",
  templateUrl: "./stud-ans.component.html",
  styleUrls: ["./stud-ans.component.css"],
})
export class StudAnsComponent implements OnInit {
  constructor(
    private sub: StorageService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}
  id;
  q;
  store;
  quiz;
  uid;
  filtered;

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.q = this.sub.getQuiz(this.id);
    this.uid = this.auth.conUser().uid;

    this.store = JSON.parse(localStorage.getItem("reponse"));
    this.filtered = this.store.filter((cop) => cop.uid == this.uid);
    this.quiz = this.filtered[this.id];
  }
}
