import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { EventSessionModel } from 'src/app/models/event-sessions.model';
import { SessionListService } from './services/session-list.service';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private sessionListService: SessionListService
  ) {
    this.sessionId = this.cookieService.get('session_id');
  }

  /**
   * The session ID.
   */
  sessionId: string;

  /**
   * Input the event sessions.
   */
  @Input() eventSessions: EventSessionModel[];

  /**
   * Output when an item is added to the cart.
   */
  @Output()
  change = new EventEmitter();

  /**
   * The ticket quantity selected.
   */
  selectedQuantity = 0;

  /**
   * Today's date
   */
  today = new Date();

  /**
   * Limit of tickets a user is allowed to purchase per session.
   */
  ticketLimit = 10

  ngOnInit(): void { }

  /**
   * Determine the days or hours remaining in a sale.
   * @param saleEndDate the sale end date time
   */
  daysFromTodayCalculator(saleEndDate: string): string {
    // Define the string to return
    let saleEndString = '';
    // Create new date using the saleEndDate we received from database
    let saleEndDateFormat = new Date(saleEndDate);
    // Calculate the hours remaining
    let hours = Math.floor((saleEndDateFormat.getTime() - this.today.getTime()) / 1000 / 60 / 60);

    // If there is more than a day left, return the day remaining.
    // If there is only hours left, return the hour
    if (hours > 24) {
      saleEndString = Math.ceil(hours / 24) + ' days'
    } else {
      saleEndString = hours + ' hours'
    }

    // Return remaining days or hours
    return saleEndString;
  }

  /**
   * Add selection to the cart.
   * @param eventSessionId the event session number to add tickets to.
   * @param quantity the quanity of tickets to add.
   */
  addToCart(eventSessionId: number, quantity: number): void {
    if (this.sessionId != null) {
      // If the user does not yet have a cart, create the cart and add item
      this.sessionListService.getCartId(this.sessionId).then((id) => {
        if (id == 0) {
          this.sessionListService.createCart(this.sessionId).then((cartId: number) => {
            this.addItemToCart(cartId, eventSessionId, quantity);
          });
        } else {
          // If the user has a cart already, add the item.
          const cartId = id;
          this.addItemToCart(cartId, eventSessionId, quantity);
        }
      });
    }
  }

  /**
   * Helper function to add the item to cart after cart ID is determined.
   * @param eventSessionId the cart ID to add the tickets to.
   * @param eventSessionId the event session number to add tickets to.
   * @param quantity the quanity of tickets to add.
   */
  addItemToCart(cartId: number, eventSessionId: number, quantity: number): void {
    this.sessionListService.addItemToCart(new CartItemModel(cartId, eventSessionId, quantity)).then(() => {
      this.change.emit(this.sessionId);
    });
  }

  /**
   * Function used to generate the quantity selection
   */
  numSequence(n: number): Array<number> {
    // Add 1 to account for 0 option.
    return Array(n + 1);
  }
}
