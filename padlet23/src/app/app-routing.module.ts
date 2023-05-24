import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PadletListComponent} from "./padlet-list/padlet-list.component";
import {HomeComponent} from "./home/home.component";
import {PadletDetailComponent} from "./padlet-detail/padlet-detail.component";
//import {EntryFormComponent} from "./entry-form/entry-form.component";
import {PadletFormComponent} from "./padlet-form/padlet-form.component";
import {EntryFormComponent} from "./entry-form/entry-form.component";
import {LoginComponent} from "./login/login.component";
import {CanNavigateToAdminGuard} from "./can-navigate-to-admin.guard";

const routes: Routes = [
  {path: '', redirectTo: 'padlets', pathMatch: 'full'},
  {path: 'padlets', component: PadletListComponent},
  {path: 'padlets/:id', component: PadletDetailComponent},
  {path: 'admin/:id', component: PadletFormComponent, canActivate:[CanNavigateToAdminGuard]},
  {path: 'admin', component: PadletFormComponent, canActivate:[CanNavigateToAdminGuard]},
  {path: 'admin/padlets/:padlet_id/entries/:entry_id', component: EntryFormComponent,  canActivate:[CanNavigateToAdminGuard]},
  {path: 'admin/padlets/:padlet_id/entries', component: EntryFormComponent, canActivate:[CanNavigateToAdminGuard]},
  {path: 'padlets/:padlet_id/:entry_id', component: HomeComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanNavigateToAdminGuard]
})
export class AppRoutingModule {
}
