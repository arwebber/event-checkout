import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.css']
})
export class CheckoutModalComponent implements OnInit {

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<CheckoutModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string }
  ) { }

  ngOnInit(): void { }

  /**
   * Dismiss the diaglog modal.
   */
  dismss(): void {
    this.dialogRef.close();
    // Navigate to home screen.
    this.router.navigate([`/event-list`]);
  }

}
