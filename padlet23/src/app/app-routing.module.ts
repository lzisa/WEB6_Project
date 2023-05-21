import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PadletListComponent} from "./padlet-list/padlet-list.component";
import {HomeComponent} from "./home/home.component";
import {PadletDetailComponent} from "./padlet-detail/padlet-detail.component";
//import {EntryFormComponent} from "./entry-form/entry-form.component";
import {PadletFormComponent} from "./padlet-form/padlet-form.component";
import {EntryFormComponent} from "./entry-form/entry-form.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'padlets', component: PadletListComponent},
  {path: 'padlets/:id', component: PadletDetailComponent},
  {path: 'admin/:id', component: PadletFormComponent},
  {path: 'admin', component: PadletFormComponent},
  {path: 'admin/padlets/:padlet_id/entries/:entry_id', component: EntryFormComponent},
  {path: 'admin/padlets/:padlet_id/entries', component: EntryFormComponent},
  {path: 'padlets/:padlet_id/:entry_id', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
