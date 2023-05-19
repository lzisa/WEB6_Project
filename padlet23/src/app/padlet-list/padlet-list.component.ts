import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgModule} from "@angular/core";
import {Entry, Padlet} from "../shared/padlet";
import {PadletStoreService} from "../shared/padlet-store.service";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: []
})
export class PadletListComponent implements OnInit {
  padlets: Padlet[] = [];

  constructor(private ps: PadletStoreService) {
  }

  ngOnInit() {
  this.ps.getAll().subscribe(res=>this.padlets=res);
  }

}
