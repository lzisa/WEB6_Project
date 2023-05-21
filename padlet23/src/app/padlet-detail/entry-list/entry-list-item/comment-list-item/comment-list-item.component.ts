import {Component, Input, OnInit} from '@angular/core';
import {Entry} from "../../../../shared/entry";
import {CommentFactory} from "../../../../shared/comment-factory";
import {ActivatedRoute} from "@angular/router";
import {Comment} from "../../../../shared/comment";
import {User} from "../../../../shared/user";
import {UserFactory} from "../../../../shared/user-factory";
import {UserStoreService} from "../../../../shared/user-store.service";

@Component({
  selector: '.bs-comment-list-item',
  templateUrl: './comment-list-item.component.html',
  styles: []
})
export class CommentListItemComponent implements OnInit {
  @Input() comment: Comment | undefined;

  user: User = UserFactory.empty();

  constructor(
    private route: ActivatedRoute,
    private us: UserStoreService
  ) {
  }

  ngOnInit() {
    if(this.comment){
      this.getUser(this.comment.user_id);
    }
  }

  getUser(id: number): void {
    this.us.getSingle(id).subscribe(user => {
      this.user = user;
    });
  }
}
