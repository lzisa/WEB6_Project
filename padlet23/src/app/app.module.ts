import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PadletListComponent } from './padlet-list/padlet-list.component';
import { PadletListItemComponent } from './padlet-list-item/padlet-list-item.component';
import { PadletDetailComponent } from './padlet-detail/padlet-detail.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import {PadletStoreService} from "./shared/padlet-store.service";
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { PadletFormComponent } from './padlet-form/padlet-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PadletListComponent,
    PadletListItemComponent,
    PadletDetailComponent,
    EntryListComponent,
    HomeComponent,
    PadletFormComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [PadletStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
