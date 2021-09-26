import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EventModel } from "src/app/models/event.model";

@Injectable({
  providedIn: "root"
})
export class EventService {
  constructor(private http: HttpClient) {}

  /**
   * Return a list of
   * @return eventList
   */
  getEvents() {
    return new Promise<EventModel[]>((resolve, reject) => {
      this.http.get("/events/v1/all").subscribe((hits: EventModel[]) => {
        resolve(hits);
      });
    });
  }
}
