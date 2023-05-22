import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PadletListComponent} from './padlet-list/padlet-list.component';
import {PadletListItemComponent} from './padlet-list-item/padlet-list-item.component';
import {PadletDetailComponent} from './padlet-detail/padlet-detail.component';
import {PadletStoreService} from "./shared/padlet-store.service";
import {EntryStoreService} from "./shared/entry-store.service";
import {HomeComponent} from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {PadletFormComponent} from './padlet-form/padlet-form.component';
import {CommentStoreService} from "./shared/comment-store.service";
import {EntryListItemComponent} from './padlet-detail/entry-list/entry-list-item/entry-list-item.component';
import {EntryFormComponent} from "./entry-form/entry-form.component";
import {UserStoreService} from "./shared/user-store.service";
import {
  CommentListItemComponent
} from './padlet-detail/entry-list/entry-list-item/comment-list-item/comment-list-item.component';
import {LoginComponent} from './login/login.component';
import {AuthenticationService} from "./shared/authentication.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import { UserrightComponent } from './shared/userright/userright.component';

@NgModule({
  declarations: [
    AppComponent,
    PadletListComponent,
    PadletListItemComponent,
    PadletDetailComponent,
    HomeComponent,

    PadletFormComponent,
    EntryFormComponent,
    EntryListItemComponent,
    CommentListItemComponent,
    LoginComponent,
    UserrightComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PadletStoreService,
    EntryStoreService,
    CommentStoreService,
    UserStoreService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
