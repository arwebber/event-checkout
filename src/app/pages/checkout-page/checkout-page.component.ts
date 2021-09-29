import { Location } from '@angular/common';
import { AfterContentChecked, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CheckoutCartService } from 'src/app/components/checkout-cart/services/checkout-cart.service';
import { CheckoutModalComponent } from 'src/app/components/checkout-modal/checkout-modal.component';
import { CartContentsModel } from 'src/app/models/cart-contents.model';
import { CheckoutFormInfo } from 'src/app/models/checkout-form-info.model';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit, AfterContentChecked {

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private location: Location,
    private checkoutCartService: CheckoutCartService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder
  ) {
    this.sessionId = this.cookieService.get('session_id')
  }

  /**
   * The mat stepper used for checkout.
   */
  @ViewChild('stepper') stepper: MatStepper;

  /**
   * The session ID.
   */
  sessionId: string;

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

  /**
   * Used to fill the text for the button.
   */
  nextStep: string

  ngOnInit(): void {
    if (this.sessionId != null) {
      this.checkoutCartService.getCartBySession(this.sessionId).then((cart) => {
        this.cartContentList = cart;
        this.cartContentList.forEach((cartItem) => {
          const cartInfoItem = new CheckoutFormInfo(cartItem);
          this.checkoutFormData.push(this.formBuilder.group(cartInfoItem))
        })
        this.buildForm(this.checkoutFormData);
      });
    }
  }

  ngAfterContentChecked() {
    this.nextStep = this.getStepLabel();
  }

  getStepLabel(): string {
    try {
      const stepLabel = 'View ' + this.stepper.steps.get(this.stepper.selectedIndex + 1).label;
      return stepLabel;
    } catch (e) {
      return 'Submit Purchase';
    }
  }

  buildForm(checkoutFormData) {
    this.ticketForm = this.formBuilder.group({
      tickets: this.formBuilder.array(checkoutFormData)
    });
  }

  showContent(process) {
    process.value.visible = true;
  }

  hideContent(process) {
    process.value.visible = false;
  }

  goBackStep(stepper: MatStepper) {
    stepper.previous();
  }

  goForwardStep(stepper: MatStepper) {
    if (this.nextStep != 'Submit Purchase') {
      stepper.next();
    } else {
      this.completePurchase();
    }
    // this.nextStep = stepper
  }

  completePurchase() {
    console.log('tix', this.ticketForm.value.tickets);
    this.checkoutCartService.addTicketsSold(this.ticketForm.value.tickets)
    // TODO: call db to add sold
    let dialogRef = this.dialog.open(CheckoutModalComponent, {
      height: '400px',
      width: '600px',
    });
  }

  goBack() {
    this.location.back();
  }
}
