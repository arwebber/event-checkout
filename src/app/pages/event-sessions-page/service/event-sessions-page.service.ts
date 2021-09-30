import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EventSessionModel } from 'src/app/models/event-sessions.model';

@Injectable({
  providedIn: "root"
})
export class EventSessionsPageService {
  constructor(private http: HttpClient) { }

  /**
   * Return the sessions for an event.
   * @return event: EventSessionModel[]
   */
  getEventSessions(eventId): Promise<EventSessionModel[]> {
    return new Promise<EventSessionModel[]>((resolve, reject) => {
      this.http
        .get('/api/event-sessions/v1/', { params: { eventId } })
        .subscribe(
          (event: EventSessionModel[]) => {
            resolve(event);
          },
          (error) => {
            console.error(error);
            reject('error');
          });
    });
  }

  /**
   * Return the total number of tickets sold for an event session.
   * @return totalSold: number
   */
  getEventTicketsSold(eventSessionId: number): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.http
        .get('/api/sold/v1/tickets/event/session/', { params: { eventSessionId } })
        .subscribe(
          (ticketsSold) => {
            resolve(ticketsSold[0].totalSold);
          },
          (error) => {
            console.error(error);
            reject('error');
          });
    });
  }
}
