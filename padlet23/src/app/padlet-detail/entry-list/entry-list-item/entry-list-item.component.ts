import {Component, Input, OnInit} from '@angular/core';
import {Entry} from "../../../shared/entry";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentStoreService} from "../../../shared/comment-store.service";
import {Comment} from "../../../shared/comment";
import {User} from "../../../shared/user";
import {UserFactory} from "../../../shared/user-factory";
import {UserStoreService} from "../../../shared/user-store.service";
import {EntryStoreService} from "../../../shared/entry-store.service";
import {EntryFactory} from "../../../shared/entry-factory";
import {CommentFactory} from "../../../shared/comment-factory";
import {AuthenticationService} from "../../../shared/authentication.service";

@Component({
  selector: '.bs-entry-list-item',
  templateUrl: './entry-list-item.component.html',
  styles: []
})
export class EntryListItemComponent implements OnInit {
  @Input() entry: Entry | undefined;
  comments: Comment[] = [];
  user: User = UserFactory.empty();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cs: CommentStoreService,
    private us: UserStoreService,
    private es: EntryStoreService,
    private as: AuthenticationService
  ) {
  }

  ngOnInit() {
    if (this.entry) {
      this.getUser(this.entry.user_id);
      this.cs.getAllCommentsFromPadletFromEntry(this.entry.padlet_id, this.entry.id)
        .subscribe(comments => {
          this.comments = comments;
        });
    }
  }

  createComment(entryId: number, commentText: string) {
    let padlet_id = this.route.snapshot.params['padlet_id'];
    let comment = CommentFactory.empty();
    comment.text = commentText;
    comment.entry_id = entryId;
    comment.user_id = this.as.getCurrentUserId();
    this.cs.create(comment, padlet_id).subscribe(res => {
      this.comments.push(res);
    });
  }

  getUser(id: number): void {
    this.us.getSingle(id).subscribe(user => {
      this.user = user;
    });
  }



  removeEntry() {

    if (this.entry) {
      console.log(this.entry.id);
      console.log(this.entry.padlet_id);
      console.log(this.entry.id);
      //this.es.remove(this.entry.padlet_id, this.entry.id);
      if (confirm('Entry wirklich löschen?')) {
        this.es.remove(this.entry.padlet_id, this.entry.id).subscribe((res: any) => {
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/padlets', this.entry?.padlet_id]); // Seite neu laden
          });
        });
      }
    }
  }
}
