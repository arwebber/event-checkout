export class CartContentsModel {
  cart_item_id: number;
  cart_id: number;
  date_created: string;
  event_session_id: number;
  event_id: number;
  event_title: number;
  price: number;
  title: string;
  quantity: number;
  visible: boolean;

  constructor(
    cart_item_id: number,
    cart_id: number,
    date_created: string,
    event_session_id: number,
    event_id: number,
    event_title: number,
    price: number,
    title: string,
    quantity: number
  ) {
    this.cart_item_id = cart_item_id;
    this.cart_id = cart_id;
    this.date_created = date_created;
    this.event_session_id = event_session_id;
    this.event_id = event_id;
    this.event_title = event_title;
    this.price = price;
    this.title = title;
    this.quantity = quantity;
  }
}
