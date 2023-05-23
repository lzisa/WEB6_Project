import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgModule} from "@angular/core";
import {Entry, Padlet} from "../shared/padlet";
import {PadletStoreService} from "../shared/padlet-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";
import {UserStoreService} from "../shared/user-store.service";
import {UserrightsStoreService} from "../shared/userrights-store.service";
import {Userright} from "../shared/userright";
import {User} from "../shared/user";
import {UserFactory} from "../shared/user-factory";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: []
})
export class PadletListComponent implements OnInit {
  padlets: Padlet[] = [];
  padletsPublic: Padlet[] = [];
  padletsTeamRights: Userright[] = [];
  padletsTeam: Padlet[] = [];
  padletsPrivate: Padlet[] = [];
  selectedOption: String = 'option3';
  selectedText: String = 'Public padlets';



  constructor(private ps: PadletStoreService,
              private authService: AuthenticationService,
              private userrightsService: UserrightsStoreService,
) {
  }

  onOptionChange() {
    this.selectedText = this.getSelectedOptionText();
    console.log('Selected option text:', this.selectedText);
  }

  getSelectedOptionText(): string {
    const selectedOptionElement = Array.from(document.querySelectorAll('option'))
      .find(option => option.value === this.selectedOption);

    return selectedOptionElement?.textContent || '';
  }

  ngOnInit() {
    let user_id = this.authService.getCurrentUserId();
    //get padlets of Owner, private or not
    this.ps.getOwnersPadlets(this.authService.getCurrentUserId())
      .subscribe(res => this.padletsPrivate = res);
    //get all public padlets
    this.ps.getPublicPadlets().subscribe(res => this.padletsPublic = res);


    //get all padlets are shared with me
    this.userrightsService.getAllSharedPadletsWithUser(user_id).subscribe(res => {
      this.padletsTeamRights = res;

      //get padlets
      this.padletsTeamRights.forEach((right) => {
        this.ps.getSingle(right.padlet_id).subscribe(res => this.padletsTeam.push(res));
      });
    });
  }
}
