import { Component, Input, OnInit } from '@angular/core';
import { EventSessionModel } from 'src/app/models/event-sessions.model';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {

  constructor() { }

  @Input() eventSessions: EventSessionModel[];

  /**
   * The ticket quantity selected.
   */
  selectedQuantity = 0;

  /**
   * Days from today calculated for UI
   */
  daysFromToday;

  /**
   * Today's date
   */
  today = new Date();

  ngOnInit(): void {
  }

  daysFromTodayCalculator(saleEndDate) {
    let saleEndString = '';

    let saleEndDateFormat = new Date(saleEndDate);

    let hours = Math.floor((saleEndDateFormat.getTime() - this.today.getTime()) / 1000 / 60 / 60);

    if (hours > 24) {
      saleEndString = Math.ceil(hours / 24) + ' days'
    } else {
      saleEndString = hours + ' hours'
    }

    return saleEndString;
  }

  printChange(sessionId, eventValue) {
    console.log('session Id is ', sessionId, ' and quantity is ', eventValue);
  }

  /**
   * Function used to generate the quantity selection
   */
  numSequence(n: number): Array<number> {
    return Array(n);
  }

}
