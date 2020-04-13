import { Component, OnInit } from "@angular/core";
import { AuthService } from "../service/auth.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  constructor(public auth: AuthService) {}

  navbarOpen = false;
  isLoggedIn = false;
  isCoach = false;
  conUser;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  logOut() {
    this.auth.logOut();
  }

  ngOnInit(): void {
    this.conUser = this.auth.conUser();
    if (this.conUser) {
      this.isLoggedIn = true;
    }

    this.isCoach = this.auth.conCoach();
  }
}
