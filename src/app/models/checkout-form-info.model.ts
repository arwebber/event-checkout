import { CartContentsModel } from './cart-contents.model';

export class CheckoutFormInfo {
    cartItem: CartContentsModel;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;

    constructor(
        cartItem: CartContentsModel
    ) {
        this.cartItem = cartItem;
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = '';
        this.company = '';
    }
}
