import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-business",
  templateUrl: "./business.component.html",
  styleUrls: ["./business.component.scss"]
})
export class BusinessComponent implements OnInit {
  @Input("data") data: any;
  @Input("button") button: boolean;

  constructor() {}

  ngOnInit() {}
}
