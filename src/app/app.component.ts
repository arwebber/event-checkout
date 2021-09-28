import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'event-checkout';

  constructor(
    private cookieService: CookieService
  ) { }

  public ngOnInit() {
    if (this.cookieService.get('session_id') == null || this.cookieService.get('session_id') == '') {
      this.cookieService.set('session_id', uuidv4())
    }
  }
}
