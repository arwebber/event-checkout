import { Component, OnInit } from "@angular/core";
import { EventModel } from "../../models/event.model";
import { EventsPageService } from "./services/events-page.service";

@Component({
  selector: "app-events-page",
  templateUrl: "./events-page.component.html",
  styleUrls: ["./events-page.component.css"]
})
export class EventsPageComponent implements OnInit {
  constructor(private eventsPageService: EventsPageService) { }

  eventList: EventModel[];

  ngOnInit() {
    // Load all events into the UI.
    this.eventsPageService.getAllEvents().then((events: EventModel[]) => {
      this.eventList = events;
    });
  }
}
