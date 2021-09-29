import { Location } from '@angular/common';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { CheckoutCartService } from 'src/app/components/checkout-cart/services/checkout-cart.service';
import { CartContentsModel } from 'src/app/models/cart-contents.model';
import { EventSessionModel } from 'src/app/models/event-sessions.model';
import { EventDetailsService } from "./service/event-details.service";

@Component({
  selector: "app-event-details",
  templateUrl: "./event-details.component.html",
  styleUrls: ["./event-details.component.css"]
})
export class EventDetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private eventDetailsService: EventDetailsService,
    private location: Location,
    private router: Router,
    private checkoutCartService: CheckoutCartService,
    private cookieService: CookieService
  ) {
    this.eventName = this.activatedRoute.snapshot.params.eventName;
    this.eventId = this.activatedRoute.snapshot.params.eventId;
    this.sessionId = this.cookieService.get('session_id');
  }

  /**
   * The selected event id used to retrieve the event sessions.
   */
  eventId: string;

  /**
   * The selected event name.
   */
  eventName: string;

  /**
   * Get the session ID from the cookie.
   */
  sessionId: string;

  /**
   * List of the sessions for the selected event.
   */
  eventSessions: EventSessionModel[]

  /**
   * List of cart contents.
   */
  cartContentList: CartContentsModel[]

  ngOnInit() {
    this.eventDetailsService.getEventSessions(this.eventId).then((sessions: EventSessionModel[]) => {
      this.eventSessions = sessions;

      this.loadTicketsSold(this.eventSessions);

      console.log('tickets remaining', this.eventSessions);

    });
    this.loadCart('t');
  }

  loadTicketsSold(sessions: EventSessionModel[]) {
    // Retrieve the tickets sold for each event.
    sessions.forEach((event: EventSessionModel) => {
      console.log('the event', event);
      this.eventDetailsService.getEventTicketsSold(event.event_session_id).then((ticketsSold) => {
        event.tickets_sold = ticketsSold;
      })
    })
  }

  loadCart(event) {
    if (this.sessionId != null) {
      this.checkoutCartService.getCartBySession(this.sessionId).then((cart) => {
        this.cartContentList = cart;
      });
    }
  }

  goBack() {
    this.location.back();
  }

  checkout() {
    this.router.navigate(['/checkout'])
  }
}
