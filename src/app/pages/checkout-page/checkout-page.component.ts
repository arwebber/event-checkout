import { Location } from '@angular/common';
import { AfterContentChecked, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
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
    private location: Location,
    private checkoutCartService: CheckoutCartService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder
  ) {
    this.sessionId = this.cookieService.get('session_id');
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
   * Form group for the tickets.
   */
  ticketForm: FormGroup;

  /**
   * Form group for the payment.
   */
  paymentForm: FormGroup;

  /**
   * Cart Checkout Data
   */
  checkoutFormData: FormGroup[] = [];

  /**
   * Used to fill the text for the button.
   */
  nextStep: string;

  /**
   * Determine if user skips to payment to enable the submit button.
   */
  formBypass = false;

  /**
   * Initialize the component by loading the cart contents and pushing into list.
   */
  ngOnInit(): void {
    if (this.sessionId != null) {
      // Get the cart contents
      this.checkoutCartService.getCartBySession(this.sessionId).then((cart) => {
        // Assign content to the list
        this.cartContentList = cart;
        // Loop through contents to add to checkout form
        this.cartContentList.forEach((cartItem) => {
          const cartInfoItem = new CheckoutFormInfo(cartItem);
          for (let i = 0; i < cartInfoItem.cartItem.quantity; i++) {
            this.checkoutFormData.push(this.formBuilder.group(cartInfoItem));
          }
        });
        // Build the checkout form.
        this.buildForm(this.checkoutFormData);
      });
    }
  }

  /**
   * Update the step label on the button after being pressed.
   */
  ngAfterContentChecked(): void {
    this.nextStep = this.getStepLabel();
  }

  /**
   * Return the step label on the button.
   */
  getStepLabel(): string {
    try {
      const stepLabel = 'View ' + this.stepper.steps.get(this.stepper.selectedIndex + 1).label;
      return stepLabel;
    } catch (e) {
      // If we are out of index, display submit purchase.
      return 'Submit Purchase';
    }
  }

  /**
   * Build the checkout form.
   */
  buildForm(checkoutFormData): void {
    // Add existing data to partial ticket form.
    this.ticketForm = this.formBuilder.group({
      tickets: this.formBuilder.array(checkoutFormData)
    });

    // Create blank payment form.
    this.paymentForm = this.formBuilder.group({ name: '', cardNumber: '', cvv: '', expDate: '' });
  }

  /**
   * Expand the card to display details.
   */
  showContent(process): void {
    process.value.visible = true;
  }

  /**
   * Shrink the card to only display title.
   */
  hideContent(process): void {
    process.value.visible = false;
  }

  /**
   * Go to previous step.
   */
  goBackStep(stepper: MatStepper): void {
    if (this.formBypass) {
      this.stepper.selectedIndex = 0;
      this.formBypass = false;
    } else {
      this.stepper.previous();
    }
  }

  /**
   * Go to next step and determine the text to dispaly in the button.
   */
  goForwardStep(stepper: MatStepper): void {
    if (this.nextStep != 'Submit Purchase') {
      this.stepper.next();
    } else {
      this.completePurchase();
    }
  }

  /**
   * Bypass to last step and set bypass to true.
   */
  goToLastStep(): void {
    this.stepper.selectedIndex = 2;
    this.formBypass = true;
  }

  /**
   * Complete the purchase and display a dialog box.
   */
  completePurchase(): void {
    this.checkoutCartService.addTicketsSold(this.ticketForm.value.tickets).then(() => {
      // Open success dialog box
      this.dialog.open(CheckoutModalComponent, {
        height: '400px',
        width: '600px',
        data: { type: 'success' }
      });
    }).catch(() => {
      // Open error dialog box
      this.dialog.open(CheckoutModalComponent, {
        height: '400px',
        width: '600px',
        data: { type: 'error' }
      });
    });
  }

  /**
   * Go back to viewing event details
   */
  goBack(): void {
    this.location.back();
  }
}
