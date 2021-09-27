import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { EventDetailsComponent } from "./pages/event-details/event-details.component";
import { EventListComponent } from "./pages/event-list/event-list.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/event-list",
    pathMatch: "full"
  },
  {
    path: "event-list",
    component: EventListComponent
  },
  {
    path: "event-details/:eventName/:eventId",
    component: EventDetailsComponent
  },
  {
    path: "checkout",
    component: CheckoutPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
