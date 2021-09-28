import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CartContentsModel } from 'src/app/models/cart-contents.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutCartService {

  constructor(private http: HttpClient) { }

  /**
   * Return the cart for a given session.
   * @param sessionId
   * @return cart
   */
  getCartBySession(sessionId: string) {
    console.log('time to get cart by session', sessionId);
    return new Promise<CartContentsModel[]>((resolve, reject) => {
      this.http
        .get('/api/cart/v1/contents/by/session/', { params: { sessionId } })
        .subscribe((cart: CartContentsModel[]) => {
          resolve(cart);
        });
    });
  }


  getCartSubtotal(sessionId: string) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get('/api/cart/v1/contents/total/', { params: { sessionId } })
        .subscribe((subtotal) => {
          resolve(subtotal);
        });
    });
  }

  /**
   * Delete an item from the cart.
   */
  deleteCartItemById(cartItemId: number) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .delete('/api/cart/v1/delete/cart/item/', { body: { cart_item_id: cartItemId } })
        .subscribe((cart) => {
          resolve(cart);
        });
    });
  }
}
