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

@Component({
  selector: 'bs-padlet-detail',
  templateUrl: './padlet-detail.component.html',
  styles: []
})
export class PadletDetailComponent implements OnInit {
  padlet: Padlet = PadletFactory.empty();
  entries: Entry[] = [];
  comments: Comment[] = [];
  editedTitle: string | undefined;

  constructor(
    private ps: PadletStoreService,
    private es: EntryStoreService,
    private cs: CommentStoreService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    let padlet_id = params['id'];
    this.ps.getSingle(padlet_id).subscribe((p: Padlet) => {
      this.padlet = p;
      this.getEntries(padlet_id);
    });
  }

  getEntries(padlet_id: number): void {
    this.es.getAllEntries(padlet_id).subscribe(entries => {
      if(entries){
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
