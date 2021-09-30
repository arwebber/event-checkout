export class TicketsSoldModel {
    event_session_id: number;
    quantity: number;
    email: string;

    constructor(
        event_session_id: number,
        quantity: number,
        email: string,
    ) {
        this.event_session_id = event_session_id;
        this.quantity = quantity;
        this.email = email;
    }
}
