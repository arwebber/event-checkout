export class EventModel {
  event_id: number;
  title: string;
  description: string;
  start_date_time: string;
  end_date_time: string;
  status: string;
  banner_image: string;

  constructor(
    event_id: number,
    title: string,
    description: string,
    start_date_time: string,
    end_date_time: string,
    status: string,
    banner_image: string
  ) {
    this.event_id = event_id;
    this.title = title;
    this.description = description;
    this.start_date_time = start_date_time;
    this.end_date_time = end_date_time;
    this.status = status;
    this.banner_image = banner_image;
  }
}
