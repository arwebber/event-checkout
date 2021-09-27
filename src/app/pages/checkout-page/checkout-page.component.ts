import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }
}
