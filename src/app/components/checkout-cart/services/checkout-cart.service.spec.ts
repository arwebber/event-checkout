import { TestBed } from '@angular/core/testing';
import { CheckoutCartService } from './checkout-cart.service';


describe('CheckoutService', () => {
  let service: CheckoutCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
