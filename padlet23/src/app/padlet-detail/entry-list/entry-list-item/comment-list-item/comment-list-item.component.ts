import {Component, Input, OnInit} from '@angular/core';
import {Entry} from "../../../../shared/entry";
import {CommentFactory} from "../../../../shared/comment-factory";
import {ActivatedRoute} from "@angular/router";
import {Comment} from "../../../../shared/comment";
import {User} from "../../../../shared/user";
import {UserFactory} from "../../../../shared/user-factory";
import {UserStoreService} from "../../../../shared/user-store.service";
import {AuthenticationService} from "../../../../shared/authentication.service";

@Component({
  selector: '.bs-comment-list-item',
  templateUrl: './comment-list-item.component.html',
  styles: []
})
export class CommentListItemComponent implements OnInit {
  @Input() comment: Comment | undefined;

  user: User = UserFactory.empty();
  loggedinUser: User = UserFactory.empty();

  constructor(
    private route: ActivatedRoute,
    private us: UserStoreService,
    private as: AuthenticationService
  ) {
  }

  ngOnInit() {
    if (this.comment) {
      this.getUser(this.comment.user_id);
      //get logged in User
      this.loggedinUser.id = this.as.getCurrentUserId();
      this.formatDate();
    }
  }

  formatDate() {
    if (this.comment) {
      const date = new Date(this.comment.created_at);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      this.comment.created_at = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
    }
  }


  getUser(id: number): void {
    this.us.getSingle(id).subscribe(user => {
      this.user = user;
    });
  }
}
