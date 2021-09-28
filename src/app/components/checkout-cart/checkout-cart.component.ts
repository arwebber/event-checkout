import { Component, OnChanges, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartContentsModel } from 'src/app/models/cart-contents.model';
import { CheckoutService } from './services/checkout.service';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.css']
})
export class CheckoutCartComponent implements OnInit, OnChanges {

  constructor(
    private checkoutService: CheckoutService,
    private cookieService: CookieService
  ) { }

  /**
   * List of cart contents.
   */
  cartContentList: CartContentsModel[]

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
    const sessionId = this.cookieService.get('session_id')
    if (sessionId != null) {
      this.checkoutService.getCartBySession(sessionId).then((cart) => {
        this.cartContentList = cart;
      });

      this.cartSubTotal(sessionId);
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
    });
  }

  cartSubTotal(sessionId) {
    this.checkoutService.getCartSubtotal(sessionId).then((subtotal) => {
      console.log('sub', subtotal.subtotal);
      this.subtotal = subtotal.subtotal;
    })
  }

  ngOnChanges(): void {
    console.log('change occured in checkout')
  }

}
