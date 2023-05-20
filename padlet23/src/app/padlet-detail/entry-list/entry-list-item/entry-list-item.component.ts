import {Component, Input, OnInit} from '@angular/core';
import {Entry} from "../../../shared/entry";
import {ActivatedRoute} from "@angular/router";
import {CommentStoreService} from "../../../shared/comment-store.service";
import {Comment} from "../../../shared/comment";

@Component({
  selector: '.bs-entry-list-item',
  templateUrl: './entry-list-item.component.html',
  styles: []
})
export class EntryListItemComponent implements OnInit {
  @Input() entry: Entry | undefined;
  comments: Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private cs: CommentStoreService,
  ) {
  }

  ngOnInit() {
    if (this.entry) {
      this.cs.getAllCommentsFromPadletFromEntry(this.entry.padlet_id, this.entry.id)
        .subscribe(comments => {
          this.comments = comments
        });
    }
  }
}
