export class CartContentsModel {
  cart_item_id: string;
  cart_id: number;
  date_created: string;
  event_session_id: number;
  event_id: number;
  price: number;
  title: string;
  quantity: string;
  visible: boolean;

  constructor(
    cart_item_id: string,
    cart_id: number,
    date_created: string,
    event_session_id: number,
    event_id: number,
    price: number,
    title: string,
    quantity: string
  ) {
    this.cart_item_id = cart_item_id;
    this.cart_id = cart_id;
    this.date_created = date_created;
    this.event_session_id = event_session_id;
    this.event_id = event_id;
    this.price = price;
    this.title = title;
    this.quantity = quantity;
  }
}
