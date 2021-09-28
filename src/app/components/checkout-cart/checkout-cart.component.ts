import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartContentsModel } from 'src/app/models/cart-contents.model';
import { CheckoutCartService } from './services/checkout-cart.service';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.css']
})
export class CheckoutCartComponent implements OnInit, OnChanges {

  constructor(
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
   * Boolean to determine if edit has been selected.
   */
  subtotal: number;

  ngOnInit(): void {
    if (this.sessionId != null) {
      this.cartSubTotal();
    }
  }

  /**
   * Function to delete item from cart.
   */
  deleteItem(cartItemId) {
    console.log('clicked!!!', cartItemId)
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
      this.subtotal = subtotal.subtotal;
    })
  }

  ngOnChanges(): void {
    // setTimeout(() => {
    this.cartSubTotal();
    // }, 200);
  }
}
