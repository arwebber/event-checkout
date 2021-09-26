import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
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
    path: "event-details/:eventId",
    component: EventDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
