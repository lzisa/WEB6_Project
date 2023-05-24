import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {UserStoreService} from "../../../../shared/user-store.service";
import {Comment} from "../../../../shared/comment";
import {Entry} from "../../../../shared/entry";
import {RatingStoreService} from "../../../../shared/rating-store.service";
import {Rating} from "../../../../shared/rating";
import {AuthenticationService} from "../../../../shared/authentication.service";
import {RatingFactory} from "../../../../shared/rating-factory";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: '.bs-rating-list-item',
  templateUrl: './rating-list-item.component.html',
  styles: []
})

export class RatingListItemComponent implements OnInit {
  @Input() entry: Entry | undefined;
  likes: number = 0;
  liked: Rating = RatingFactory.empty();
  ratings: Rating[] = [];

  constructor(
    private us: UserStoreService,
    private rs: RatingStoreService,
    public as: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.getRatingAmount();
    this.getRatingOfUser();
  }


  getRatingAmount() {
    if (this.entry) {
      this.rs.getRatingsForEntry(this.entry.padlet_id, this.entry.id).subscribe(res => {
        this.likes=res.length;
      });
    }

  }

  getRatingOfUser() {
    if (this.entry) {
      this.rs.getRatingOfUserForEntry(this.entry, this.as.getCurrentUserId())
        .subscribe(res => {
          this.liked = res;
          console.log(res);
        });
    }
  }

  toggleRating() {
    if (this.liked.rating) {
      this.removeRating();
    } else this.addRating();
  }

  addRating() {
    if (this.entry) {
      console.log('toggle successful');
      let newRating = RatingFactory.empty();
      newRating.rating = true;
      newRating.entry_id = this.entry.id;
      newRating.user_id = this.as.getCurrentUserId();
      this.rs.create(this.entry.padlet_id, newRating).subscribe(
        (res: any) => {
          this.liked = res;
          this.likes++;
        });
    }
  }

  removeRating() {
    if (this.entry) {
      console.log('delete rating');
      this.rs.removeRating(this.entry.padlet_id, this.entry.id, this.as.getCurrentUserId()).subscribe(
        (res: any) => {
          this.liked.rating = false;
          this.likes--;
        });
    }
  }
}
