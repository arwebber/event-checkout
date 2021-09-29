import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EventSessionModel } from 'src/app/models/event-sessions.model';

@Injectable({
  providedIn: "root"
})
export class EventDetailsService {
  constructor(private http: HttpClient) { }

  /**
   * Return the sessions for an event.
   * @return event
   */
  getEventSessions(eventId) {
    return new Promise<EventSessionModel[]>((resolve, reject) => {
      this.http
        .get('/api/event-sessions/v1/', { params: { eventId } })
        .subscribe((event: EventSessionModel[]) => {
          resolve(event);
        });
    });
  }

  /**
   * Return the sessions for an event.
   * @return event
   */
  getEventTicketsSold(eventSessionId: number) {
    console.log('sending the session id', eventSessionId);
    return new Promise<any>((resolve, reject) => {
      this.http
        .get('/api/sold/v1/tickets/event/session/', { params: { eventSessionId } })
        .subscribe((ticketsSold) => {
          resolve(ticketsSold[0].totalSold);
        });
    });
  }
}
