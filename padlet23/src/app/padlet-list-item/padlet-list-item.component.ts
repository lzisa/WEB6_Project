import {Component, Input, OnInit} from '@angular/core';
import {Padlet} from "../shared/padlet";
import {User} from "../shared/user";
import {UserFactory} from "../shared/user-factory";
import {UserStoreService} from "../shared/user-store.service";

@Component({
  selector: '.bs-padlet-list-item',
  templateUrl: './padlet-list-item.component.html',
  styles: []
})
export class PadletListItemComponent implements OnInit {
  @Input() padlet: Padlet | undefined;
  owner: User = UserFactory.empty();

  constructor(private us: UserStoreService) {
  }

  ngOnInit() {
    if (this.padlet){
      this.us.getSingle(this.padlet.user_id).subscribe(res =>this.owner = res);
    }

  }
}
