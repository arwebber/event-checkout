import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CartItemModel } from 'src/app/models/cart-item.model';
import { EventSessionModel } from 'src/app/models/event-sessions.model';

@Injectable({
  providedIn: 'root'
})
export class SessionListService {

  constructor(private http: HttpClient) { }

  /**
   * Return the sessions for an event.
   * @return event
   */
  addItemToCart(item: CartItemModel) {
    return new Promise<EventSessionModel[]>((resolve, reject) => {
      this.http
        .post('/api/cart/v1/add/cart/item', item)
        .subscribe(
          (event: EventSessionModel[]) => {
            resolve(event);
          },
          (error) => {
            console.error(error)
            reject('error')
          });
    });
  }

  /**
   * Return the cart id.
   * @param sessionId
   * @return cart
   */
  getCartId(sessionId) {
    return new Promise<number>((resolve, reject) => {
      this.http
        .get('/api/cart/v1/', { params: { sessionId } })
        .subscribe(
          (cart: number) => {
            resolve(cart);
          },
          (error) => {
            console.error(error)
            reject('error')
          });
    });
  }

  createCart(sessionId) {
    return new Promise<number>((resolve, reject) => {
      this.http
        .post('/api/cart/v1/add/cart', { session_id: sessionId })
        .subscribe(
          (cartId: number) => {
            resolve(cartId);
          },
          (error) => {
            console.error(error)
            reject('error')
          });
    });
  }
}
