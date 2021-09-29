import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartContentsModel } from 'src/app/models/cart-contents.model';
import { EventService } from 'src/app/pages/event-list/services/event.service';
import { CheckoutCartService } from './services/checkout-cart.service';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.css']
})
export class CheckoutCartComponent implements OnInit, OnChanges {

  constructor(
    private eventService: EventService,
    private checkoutService: CheckoutCartService,
    private cookieService: CookieService
  ) {
    this.sessionId = this.cookieService.get('session_id')
  }

  /**
   * List of cart contents.
   */
  @Input() cartContentList: CartContentsModel[]

  /**
   * The session ID loaded from cookie.
   */
  sessionId: string;

  /**
   * Boolean to determine if the promo textbox should be shown.
   */
  promoCode = false;

  /**
   * Boolean to determine if edit has been selected.
   */
  editMode = false;

  /**
   * The cart subtotal.
   */
  subtotal: number;

  /**
   * The cart subtotal including tax.
   */
  subtotalTax: number;

  /**
   * The cart total.
   */
  total: number;

  /**
   * Sales tax in Wisconsin is 5.6%
   */
  tax = 0.056;

  ngOnInit(): void {
    if (this.sessionId != null) {
      this.cartSubTotal();
    }
  }

  /**
   * Function to delete item from cart.
   */
  deleteItem(cartItemId) {
    this.checkoutService.deleteCartItemById(cartItemId).then(() => {
      const obj = this.cartContentList.filter((item) => {
        return item.cart_item_id == cartItemId;
      })
      this.cartContentList.splice(this.cartContentList.indexOf(obj[0]), 1);
      this.cartSubTotal();
    });
  }

  cartSubTotal() {
    this.checkoutService.getCartSubtotal(this.sessionId).then((subtotal) => {
      this.subtotal = +(subtotal).toFixed(2);

      if (this.subtotal > 0) {
        this.subtotalTax = +(this.subtotal * this.tax).toFixed(2);
        this.total = +(this.subtotal + this.subtotalTax).toFixed(2);
      }
    })
  }

  ngOnChanges(): void {
    // setTimeout(() => {
    this.cartSubTotal();
    // }, 200);
  }

  getEventName(eventId): string {
    this.eventService.getEvent(eventId).then((event) => {
      return event.title;
    })

    return 'error loading event title';
  }
}
