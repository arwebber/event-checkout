export class EventSessionModel {
  event_session_id: number;
  event_id: number;
  description: string;
  title: string;
  type: string;
  price: number;
  sale: boolean;
  sale_end_date_time: string;
  quantity_remaining: string;
  total_quantity: number;
  tickets_sold: number;

  constructor(
    event_session_id: number,
    event_id: number,
    description: string,
    title: string,
    type: string,
    price: number,
    sale: boolean,
    sale_end_date_time: string,
    quantity_remaining: string,
    total_quantity: number
  ) {
    this.event_session_id = event_session_id;
    this.event_id = event_id;
    this.description = description;
    this.title = title;
    this.type = type;
    this.price = price;
    this.sale = sale;
    this.sale_end_date_time = sale_end_date_time;
    this.quantity_remaining = quantity_remaining;
    this.total_quantity = total_quantity;
  }
}
