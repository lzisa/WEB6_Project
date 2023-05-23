import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Entry, Padlet} from "../shared/padlet";
import {PadletStoreService} from "../shared/padlet-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFactory} from "../shared/padlet-factory";
import {FormControl, FormGroup} from "@angular/forms";
import {EntryStoreService} from "../shared/entry-store.service";
import {CommentStoreService} from "../shared/comment-store.service";

import {forkJoin} from "rxjs";
import {Comment} from "../shared/comment";
import {User} from "../shared/user";
import {UserFactory} from "../shared/user-factory";
import {UserStoreService} from "../shared/user-store.service";
import {AuthenticationService} from "../shared/authentication.service";
import {UserrightsStoreService} from "../shared/userrights-store.service";
import {Userright} from "../shared/userright";
import {UserrightFactory} from "../shared/userright-factory";


@Component({
  selector: 'bs-padlet-detail',
  templateUrl: './padlet-detail.component.html',
  styles: []
})
export class PadletDetailComponent implements OnInit {
  padlet: Padlet = PadletFactory.empty();

  entries: Entry[] = [];
  comments: Comment[] = [];
  owner: User = UserFactory.empty();
  userright: Userright = UserrightFactory.empty();
  hasEditRightsValue: boolean = false;
  editedTitle: string | undefined;

  constructor(
    private ps: PadletStoreService,
    private es: EntryStoreService,
    private cs: CommentStoreService,
    private us: UserStoreService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService,
    private ur: UserrightsStoreService
  ) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    let padlet_id = params['id'];
    this.authService.isLoggedIn();
    this.ps.getSingle(padlet_id).subscribe((p: Padlet) => {
      this.padlet = p;
      this.getEntries(padlet_id);
      this.getOwner(this.padlet.user_id);
      //this.hasEditRightsValue =this.checkRights.hasEditRights(this.padlet);
      this.hasEditRights();
    });

  }

  getOwner(id: number): void {
    this.us.getSingle(id).subscribe(user => {
      this.owner = user;
    });
  }


  hasEditRights() {
    //check if is logged in
    if (this.authService.isLoggedIn()) {
      //check if user is owner of board
      let check = this.ur.checkifIsOwner(this.padlet.user_id);
      if (check) this.userright.edit = true;
      else {
        //check if user has Editor Rights to Padlet
        this.ur.getUserrightsOfPadletAndUser(this.padlet.id, this.authService.getCurrentUserId())
          .subscribe(
            (right: Userright) => {
              this.userright = right;
            });
      }
    } else
      this.userright.edit = false;
  }

  editRight(userright: Userright) {
    console.log(userright.edit);
    return true;
  }

  getEntries(padlet_id: number): void {
    this.es.getAllEntries(padlet_id).subscribe(entries => {
      if (entries) {
        this.padlet.entries = entries;
      }
    });
  }

  getRating(num: number) {
    return new Array(num);
  }

  removePadlet() {
    if (confirm('Padlet wirklich löschen?')) {
      this.ps.remove(this.padlet.id).subscribe((res: any) => this.router.navigate(['../'], {relativeTo: this.route}));
    }
  }

  submitForm() {
    if (this.editedTitle)
      this.ps.update(this.padlet);
  }

  updatePadlet(title: string) {
    if (this.editedTitle)
      this.padlet.title = this.editedTitle;
    this.ps.update(this.padlet);
  }

  /* updateTitle(){
     this.ps.padlet.title = this.editedTitle;
     //call API
   }*/

}
