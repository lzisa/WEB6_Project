import {Component, OnInit} from '@angular/core';
import {Padlet} from "./shared/padlet";
import {AuthenticationService} from "./shared/authentication.service";
import {UserStoreService} from "./shared/user-store.service";
import {User} from "./shared/user";
import {UserFactory} from "./shared/user-factory";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  user: User = UserFactory.empty();

  constructor(
    private authService: AuthenticationService,
    private us: UserStoreService) {

  }

  ngOnInit() {
    this.getUserPic();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getUserPic() {
    let user_id = this.authService.getCurrentUserId();
    this.us.getSingle(user_id).subscribe(user => {
      this.user = user;
    });
  }

  getLoginLabel() {
    if (this.isLoggedIn()) {
      return "Logout";
    } else {
      return "Login";
    }
  }
}
