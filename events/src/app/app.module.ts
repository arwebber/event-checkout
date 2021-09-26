import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EventComponent } from "./components/event/event.component";
import { EventDetailsComponent } from "./pages/event-details/event-details.component";
import { EventListComponent } from "./pages/event-list/event-list.component";

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventDetailsComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
