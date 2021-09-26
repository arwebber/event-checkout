import { Component, OnInit } from "@angular/core";
import { EventModel } from "../../models/event.model";
import { EventService } from "./services/event.service";

@Component({
  selector: "app-event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.css"]
})
export class EventListComponent implements OnInit {
  constructor(private eventService: EventService) {}

  eventList: EventModel[];

  ngOnInit() {
    this.eventService.getEvents().then((events: EventModel[]) => {
      this.eventList = events;
    });
  }
}
