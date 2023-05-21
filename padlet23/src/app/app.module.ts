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
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {PadletFormComponent} from './padlet-form/padlet-form.component';
import {CommentStoreService} from "./shared/comment-store.service";
import {EntryListItemComponent} from './padlet-detail/entry-list/entry-list-item/entry-list-item.component';
import {EntryFormComponent} from "./entry-form/entry-form.component";

@NgModule({
  declarations: [
    AppComponent,
    PadletListComponent,
    PadletListItemComponent,
    PadletDetailComponent,
    HomeComponent,

    PadletFormComponent,
    EntryFormComponent,
    EntryListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PadletStoreService, EntryStoreService, CommentStoreService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
