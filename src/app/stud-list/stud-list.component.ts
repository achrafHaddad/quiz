import { Component, OnInit } from "@angular/core";
import { AuthService } from "../service/auth.service";

@Component({
  selector: "app-stud-list",
  templateUrl: "./stud-list.component.html",
  styleUrls: ["./stud-list.component.css"],
})
export class StudListComponent implements OnInit {
  constructor(private auth: AuthService) {}
  list = [];
  uid;
  myList;
  users;
  coachId;
  user;
  ngOnInit(): void {
    this.list = JSON.parse(localStorage.getItem("reponse"));
    this.uid = this.auth.conUser().uid;
    this.myList = this.list.filter((q) => q.uid === this.uid);
    this.users = JSON.parse(localStorage.getItem("users"));
  }
}
