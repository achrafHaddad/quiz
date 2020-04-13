import { Component, OnInit } from "@angular/core";
import { StorageService } from "../service/storage.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private sub: StorageService) {}
  list;

  ngOnInit(): void {
    this.list = this.sub.getSub();
  }
}
