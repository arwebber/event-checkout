import { Location } from '@angular/common';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventSessionModel } from 'src/app/models/event-sessions.model';
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
    this.eventName = this.activatedRoute.snapshot.params.eventName;
    this.eventId = this.activatedRoute.snapshot.params.eventId;
  }

  /**
   * The selected event id used to retrieve the event sessions.
   */
  eventId: string;

  /**
   * The selected event name.
   */
  eventName: string;

  /**
   * List of the sessions for the selected event.
   */
  eventSessions: EventSessionModel[]

  ngOnInit() {
    this.eventDetailsService.getEventSessions(this.eventId).then((sessions: EventSessionModel[]) => {
      this.eventSessions = sessions;
    });
  }

  goBack() {
    this.location.back();
  }

  checkout() {
    this.router.navigate(['/checkout'])
  }
}
