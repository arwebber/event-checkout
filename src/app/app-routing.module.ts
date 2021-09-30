import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { EventSessionsPageComponent } from "./pages/event-sessions-page/event-sessions-page.component";
import { EventsPageComponent } from "./pages/events-page/events-page.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/event-list",
    pathMatch: "full"
  },
  {
    path: "event-list",
    component: EventsPageComponent
  },
  {
    path: "event-details/:eventName/:eventId",
    component: EventSessionsPageComponent
  },
  {
    path: "checkout",
    component: CheckoutPageComponent
  },
  {
    path: "**",
    redirectTo: "/event-list",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
