import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CheckoutCartComponent } from './components/checkout-cart/checkout-cart.component';
import { CheckoutModalComponent } from './components/checkout-modal/checkout-modal.component';
import { EventSessionsComponent } from './components/event-sessions/event-sessions.component';
import { EventComponent } from "./components/event/event.component";
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { EventSessionsPageComponent } from "./pages/event-sessions-page/event-sessions-page.component";
import { EventsPageComponent } from "./pages/events-page/events-page.component";

@NgModule({
  declarations: [
    AppComponent,
    EventsPageComponent,
    EventSessionsPageComponent,
    EventComponent,
    EventSessionsComponent,
    CheckoutCartComponent,
    CheckoutPageComponent,
    CheckoutModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    FlexLayoutModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    MatRadioModule,
    MatDialogModule,
    MatChipsModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
