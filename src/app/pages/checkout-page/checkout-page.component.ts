import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CheckoutCartService } from 'src/app/components/checkout-cart/services/checkout-cart.service';
import { CartContentsModel } from 'src/app/models/cart-contents.model';
import { CheckoutFormInfo } from 'src/app/models/checkout-form-info.model';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location,
    private checkoutCartService: CheckoutCartService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder
  ) { }

  /**
   * List of cart contents.
   */
  cartContentList: CartContentsModel[];

  /**
   * Group of forms for ticket
   */
  ticketForm: FormGroup;

  /**
   * Group of forms for ticket
   */
  ticketArray: FormArray;

  /**
   * CheckoutFormInfo data
   */
  checkoutFormData: FormGroup[] = [];

  collapsed = false;

  ngOnInit(): void {
    const sessionId = this.cookieService.get('session_id')
    if (sessionId != null) {
      this.checkoutCartService.getCartBySession(sessionId).then((cart) => {
        this.cartContentList = cart;
        this.cartContentList.forEach((cartItem) => {
          console.log('adding', cartItem.cart_item_id)
          const cartInfoItem = new CheckoutFormInfo(cartItem);
          this.checkoutFormData.push(this.formBuilder.group(cartInfoItem))
        })
        this.buildForm(this.checkoutFormData);
        // console.log(this.ticketForm);
      });
    }
    // this.buildForm();
  }

  buildForm(checkoutFormData) {

    console.log('checkoutFormData', checkoutFormData)

    this.ticketForm = this.formBuilder.group({
      sessionId: 'abc123',
      tickets: this.formBuilder.array(checkoutFormData)
    });

    console.log('ticket', this.ticketForm)


    // build form with specific data and new form data
    // console.log(this.cartContentList);
    // cartContentList.forEach((cartItem) => {
    //   this.checkoutFormData.push(new CheckoutFormInfo(cartItem))
    // })

    // this.ticketFormArray = this.formBuilder.array(this.checkoutFormData);
    // // console.log(this.checkoutFormData);
    // console.log(this.ticketFormArray);
    // console.log('conts', this.ticketFormArray.controls);
  }

  // createItem(checkoutFormData): FormGroup {
  //   console.log('got ', checkoutFormData);
  //   return this.formBuilder.group(new CheckoutFormInfo());
  // }

  showContent(process) {
    process.value.visible = true;
  }
  hideContent(process) {
    process.value.visible = false;
  }

  goBack() {
    this.location.back();
  }
}
