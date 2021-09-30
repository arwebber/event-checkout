import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EventModel } from "src/app/models/event.model";

@Injectable({
  providedIn: "root"
})
export class EventService {

  constructor(private http: HttpClient) { }

  /**
   * Return the details of a single event.
   * @return event: EventModel
   */
  getEvent(eventId: string): Promise<EventModel> {
    return new Promise<EventModel>((resolve, reject) => {
      this.http
        .get('/api/events/v1/view/', { params: { eventId } })
        .subscribe(
          (event: EventModel) => {
            resolve(event);
          },
          (error) => {
            console.error(error)
            reject('error')
          });
    });
  }

  /**
   * Return a list of all events
   * @return eventList: EventModel[]
   */
  getAllEvents(): Promise<EventModel[]> {
    return new Promise<EventModel[]>((resolve, reject) => {
      this.http.get('/api/events/v1/all').subscribe(
        (hits: EventModel[]) => {
          resolve(hits);
        },
        (error) => {
          console.error(error);
          reject('error');
        });
    });
  }
}
