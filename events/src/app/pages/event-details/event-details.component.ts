import { Location } from '@angular/common';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventDetailsService } from "./service/event-details.service";

@Component({
  selector: "app-event-details",
  templateUrl: "./event-details.component.html",
  styleUrls: ["./event-details.component.css"]
})
export class EventDetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private eventDetailsService: EventDetailsService,
    private location: Location,
    private router: Router
  ) {
    this.eventId = this.activatedRoute.snapshot.params.eventId;
  }

  /**
   * The selected event id used to retrieve the event sessions.
   */
  eventId: string;

  ngOnInit() {
    this.eventDetailsService.getEventSessions(this.eventId).then((sessions) => {
      console.log('sessions', sessions);
    });
  }

  goBack() {
    this.location.back();
  }
}
