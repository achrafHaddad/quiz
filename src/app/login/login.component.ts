import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../user";
import { AuthService } from "../service/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}
  logForm;
  user: User;
  returnUrl;
  mySubscription: any;

  onSubmit() {
    this.user = <User>this.logForm.value;
    this.auth.login(this.logForm.value);
    this.router.navigate([this.returnUrl]);
  }

  ngOnInit(): void {
    this.logForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
    });
    this.returnUrl = "/home";
  }
}
