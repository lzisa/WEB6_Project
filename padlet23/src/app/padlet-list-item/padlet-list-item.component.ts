import {Component, Input, OnInit} from '@angular/core';
import {Padlet} from "../shared/padlet";

@Component({
  selector: '.bs-padlet-list-item',
  templateUrl: './padlet-list-item.component.html',
  styles: []
})
export class PadletListItemComponent implements OnInit {
  @Input() padlet: Padlet | undefined;

  constructor() {
  }

  ngOnInit() {
  }
}
