import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../user";
import { AbstractControl } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  users: any;
  user: User;
  isAuth: boolean = false;
  isCoach: boolean = false;
  connectedUser;
  constructor(private router: Router) {}

  login(user) {
    this.users = JSON.parse(localStorage.getItem("users"));
    for (var i = 0; i < this.users.length; i++) {
      if (
        user.email == this.users[i].email &&
        user.password == this.users[i].password
      ) {
        this.user = this.users[i];
        this.connectedUser = {
          user: this.users[i].name,
          uid: this.users[i].uid,
        };
        localStorage.setItem("conUser", JSON.stringify(this.connectedUser));
      }
    }
    if (this.user.role === "coach") {
      localStorage.setItem("isCoach", "true");
    }
    if (!this.isAuth) {
      this.isAuth = false;
    }
    console.log(this.isAuth, this.user.role, this.isCoach);
  }

  conUser() {
    return JSON.parse(localStorage.getItem("conUser"));
  }
  conCoach() {
    return JSON.parse(localStorage.getItem("isCoach"));
  }

  register(user) {
    this.users = JSON.parse(localStorage.getItem("users")) || [];
    let rand = Math.floor(Math.random() * 1000);
    user.uid = rand;

    this.users.push(user);
    localStorage.setItem("users", JSON.stringify(this.users));
  }
  logOut() {
    this.isAuth = false;
    this.isCoach = false;
    localStorage.removeItem("conUser");
    localStorage.removeItem("isCoach");
    this.router.navigate(["/login"]);
  }
}
