import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Padlet} from "../shared/padlet";
import {PadletStoreService} from "../shared/padlet-store.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'bs-padlet-detail',
  templateUrl: './padlet-detail.component.html',
  styles: []
})
export class PadletDetailComponent implements OnInit {
  padlet: Padlet | undefined;

  constructor(
    private ps: PadletStoreService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.padlet = this.ps.getSingle(params['id']);
  }


  getRating(num: number) {
    return new Array(num);
  }

}
