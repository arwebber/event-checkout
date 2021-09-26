export class EventSessionModel {
  event_session_id: string;
  event_id: string;
  description: string;
  title: string;
  type: string;
  price: string;
  sale: string;
  sale_end_date_time: string;
  quantity_remaining: string;
  total_quantity: string;

  constructor(
    event_session_id: string,
    event_id: string,
    description: string,
    title: string,
    type: string,
    price: string,
    sale: string,
    sale_end_date_time: string,
    quantity_remaining: string,
    total_quantity: string
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
