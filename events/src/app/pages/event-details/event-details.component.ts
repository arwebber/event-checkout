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
    this.eventId = this.activatedRoute.snapshot.params.eventId;
  }

  /**
   * The selected event id used to retrieve the event sessions.
   */
  eventId: string;

  eventSessions: EventSessionModel[]

  selectedQuantity = 0;

  ngOnInit() {
    this.eventDetailsService.getEventSessions(this.eventId).then((sessions: EventSessionModel[]) => {
      console.log('sessions', sessions);
      this.eventSessions = sessions;
    });
  }

  goBack() {
    this.location.back();
  }

  //function to return list of numbers from 0 to n-1
  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
