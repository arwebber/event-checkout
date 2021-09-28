import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { EventSessionModel } from 'src/app/models/event-sessions.model';
import { CheckoutService } from '../checkout-cart/services/checkout.service';
import { SessionListService } from './services/session-list.service';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {

  constructor(
    private checkoutService: CheckoutService,
    private cookieService: CookieService,
    private sessionListService: SessionListService
  ) { }

  @Input() eventSessions: EventSessionModel[];

  /**
   * The ticket quantity selected.
   */
  selectedQuantity = 0;

  /**
   * Days from today calculated for UI
   */
  daysFromToday;

  /**
   * Today's date
   */
  today = new Date();

  ngOnInit(): void {
  }

  daysFromTodayCalculator(saleEndDate) {
    let saleEndString = '';

    let saleEndDateFormat = new Date(saleEndDate);

    let hours = Math.floor((saleEndDateFormat.getTime() - this.today.getTime()) / 1000 / 60 / 60);

    if (hours > 24) {
      saleEndString = Math.ceil(hours / 24) + ' days'
    } else {
      saleEndString = hours + ' hours'
    }

    return saleEndString;
  }

  printChange(sessionId, quantity) {
    console.log('session Id is ', sessionId, ' and quantity is ', quantity);
  }

  addToCart(eventSessionId, quantity) {
    const sessionId = this.cookieService.get('session_id');

    if (sessionId != null) {
      this.sessionListService.getCartId(sessionId).then((id) => {
        console.log('the id is', id);
        if (id == 0) {
          this.sessionListService.createCart(sessionId).then((cartId: number) => {
            console.log('new id is', cartId);
            this.sessionListService.addItemToCart(new CartItemModel(cartId, eventSessionId, quantity))
          })
        } else {
          const cartId = id;
          this.sessionListService.addItemToCart(new CartItemModel(cartId, eventSessionId, quantity))
        }
      });
    }
  }

  /**
   * Function used to generate the quantity selection
   */
  numSequence(n: number): Array<number> {
    return Array(n);
  }

}
