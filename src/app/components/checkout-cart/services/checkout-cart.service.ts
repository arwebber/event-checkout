import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CartContentsModel } from 'src/app/models/cart-contents.model';
import { CheckoutFormInfo } from 'src/app/models/checkout-form-info.model';
import { SubTotalModel } from 'src/app/models/subtotal.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutCartService {

  constructor(private http: HttpClient) { }

  /**
   * Return the cart for a given user session.
   * @param sessionId users session ID
   * @return cartContents
   */
  getCartBySession(sessionId: string): Promise<CartContentsModel[]> {
    return new Promise<CartContentsModel[]>((resolve, reject) => {
      this.http
        .get('/api/cart/v1/contents/by/session/', { params: { sessionId } })
        .subscribe(
          (cartContents: CartContentsModel[]) => {
            resolve(cartContents);
          },
          (error) => {
            console.error(error);
            reject('error');
          });
    });
  }

  /**
   * Return the cart subtotal for a given user session.
   * @param sessionId users session ID
   * @return the subtotal for a cart.
   */
  getCartSubtotal(sessionId: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.http
        .get('/api/cart/v1/contents/total/', { params: { sessionId } })
        .subscribe(
          (subtotal: SubTotalModel) => {
            if (subtotal.subtotal == null) {
              resolve(0);
            } else {
              resolve(subtotal.subtotal);
            }
          },
          (error) => {
            console.error(error);
            reject('error');
          });
    });
  }

  /**
   * Delete an item from the cart.
   * @param cartItemId the cart item ID to delete.
   * @return deletedCartID the deleted cart ID
   */
  deleteCartItemById(cartItemId: number): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.http
        .delete('/api/cart/v1/delete/cart/item/', { body: { cart_item_id: cartItemId } })
        .subscribe(
          (deletedCartID: number) => {
            resolve(deletedCartID);
          },
          (error) => {
            console.error(error);
            reject('error');
          });
    });
  }

  /**
   * Add tickets to the sold database after successful purchase.
   * @param tickets the tickets the user purchased
   * @return a success message
   */
  addTicketsSold(tickets: CheckoutFormInfo[]): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.http
        .post('/api/sold/v1/add/tickets/sold', { tickets: tickets }).subscribe(
          () => {
            resolve('success');
          },
          (error) => {
            console.error(error);
            reject('error');
          }
        );
    });
  }
}
