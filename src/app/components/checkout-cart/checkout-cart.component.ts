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
   * Sales tax in Wisconsin is 5%
   */
  tax = 0.05;

  ngOnInit(): void {
    if (this.sessionId != null) {
      this.cartSubTotal();
    }
  }

  /**
   * Delete item from cart.
   */
  deleteItem(cartItemId: number): void {
    // Call the delete item api.
    this.checkoutService.deleteCartItemById(cartItemId).then(() => {
      // Find the deleted item in our cart and remove from local array.
      const matchingItem = this.cartContentList.filter((item: CartContentsModel) => {
        return item.cart_item_id == cartItemId;
      })
      // Remove the deleted item from our local array.
      this.cartContentList.splice(this.cartContentList.indexOf(matchingItem[0]), 1);
      // Calculate the cart subtotal.
      this.cartSubTotal();
    });
  }

  /**
   * Calculate the cart subtotal by calling our subtotal api.
   */
  cartSubTotal(): void {
    // Call the subtotal api to get the subtotal
    this.checkoutService.getCartSubtotal(this.sessionId).then((subtotal) => {
      // Format the total to 2 decimal places.
      this.subtotal = +(subtotal).toFixed(2);

      // If the subtotal isn't empty, calculate the subtotal with tax and total to 2 decimal places.
      if (this.subtotal > 0) {
        this.subtotalTax = +(this.subtotal * this.tax).toFixed(2);
        this.total = +(this.subtotal + this.subtotalTax).toFixed(2);
      }
    })
  }

  /**
   * When changes are detected by adding a session to the cart, recalculate the total.
   */
  ngOnChanges(): void {
    this.cartSubTotal();
  }
}
