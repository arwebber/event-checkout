export class CartItemModel {
    cart_id: number;
    event_session_id: number;
    quantity: number;

    constructor(
        cart_id: number,
        event_session_id: number,
        quantity: number,

    ) {
        this.cart_id = cart_id;
        this.event_session_id = event_session_id;
        this.quantity = quantity;
    }
}
