import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../service/auth.service";
import {
  AbstractControl,
  ValidationErrors,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { NgbCheckBox } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}
  @ViewChild("box") box;
  submitted = false;
  regForm;
  returnUrl;
  store = JSON.parse(localStorage.getItem("users")) || [];

  ngOnInit(): void {
    this.regForm = new FormGroup({
      name: new FormControl("", [Validators.required, this.uniqueName()]),
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        this.uniqueEmail(),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&]).{8,}"
        ),
      ]),
      role: new FormControl("", Validators.required),
    });
    this.returnUrl = "/login";
  }

  onSubmit() {
    this.submitted = true;
    this.auth.register(this.regForm.value);
    this.router.navigate([this.returnUrl]);
  }

  uniqueName() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let user = this.store.length
        ? this.store.find((n) => n.name == control.value)
        : null;

      if (user?.name) {
        return { unique: true };
      }
    };
  }

  uniqueEmail() {
    return (control: AbstractControl): ValidationErrors | null => {
      let user = this.store
        ? this.store.find((n) => n.email == control.value)
        : null;

      if (user?.email) {
        return { unique: true };
      }
    };
  }

  validationMessages = {
    name: {
      required: "Name is required.",
      uniqueName: "Name is already taken.",
    },
    email: {
      required: "Email is required.",
      email: "Enter a valid Email",
      uniqueEmail: "Email is already taken",
    },
  };

  formErrors = {
    name: "",
    email: "",
  };

  logValidationErrors(group: FormGroup = this.regForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = "";
        if (
          abstractControl &&
          !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty)
        ) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + " ";
            }
          }
        }
      }
    });
  }
}
