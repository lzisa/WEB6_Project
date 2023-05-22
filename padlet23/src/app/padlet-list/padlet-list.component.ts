import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgModule} from "@angular/core";
import {Entry, Padlet} from "../shared/padlet";
import {PadletStoreService} from "../shared/padlet-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: []
})
export class PadletListComponent implements OnInit {
  padlets: Padlet[] = [];
  padletsPrivate: Padlet[] = [];

  constructor(private ps: PadletStoreService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.ps.getAll().subscribe(res => this.padlets = res);
    this.ps.getOwnersPadlets(this.authService.getCurrentUserId())
      .subscribe(res => this.padletsPrivate = res);
  }
}
