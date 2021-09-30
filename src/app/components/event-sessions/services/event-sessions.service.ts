import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CartItemModel } from 'src/app/models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class EventSessionsService {

  constructor(private http: HttpClient) { }

  /**
   * Add and item to a cart.
   * @return cartItemId
   */
  addItemToCart(item: CartItemModel): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.http
        .post('/api/cart/v1/add/cart/item', item)
        .subscribe(
          (cartItemId: number) => {
            resolve(cartItemId);
          },
          (error) => {
            console.error(error);
            reject('error');
          });
    });
  }

  /**
   * Return the cart id.
   * @param sessionId the users session ID
   * @return cartId
   */
  getCartId(sessionId: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.http
        .get('/api/cart/v1/', { params: { sessionId } })
        .subscribe(
          (cartId: number) => {
            resolve(cartId);
          },
          (error) => {
            console.error(error);
            reject('error');
          });
    });
  }

  /**
   * Return the cart id.
   * @param sessionId the users session ID
   * @return cartId
   */
  createCart(sessionId: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.http
        .post('/api/cart/v1/add/cart', { session_id: sessionId })
        .subscribe(
          (cartId: number) => {
            resolve(cartId);
          },
          (error) => {
            console.error(error);
            reject('error');
          });
    });
  }
}
