import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EventModel } from "src/app/models/event.model";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"]
})
export class EventComponent implements OnInit {
  constructor(private router: Router) { }

  @Input() eventDetails: EventModel;

  ngOnInit() { }

  viewEventDetails() {
    this.router.navigate([`/event-details/${this.eventDetails.title}/${this.eventDetails.event_id}`]);
  }
}
