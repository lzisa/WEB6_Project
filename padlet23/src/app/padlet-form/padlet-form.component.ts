import {PadletFactory} from "../shared/padlet-factory";
import {ActivatedRoute, Router} from "@angular/router";
import {Component, OnInit} from "@angular/core";
import {
  FormBuilder, FormGroup, FormArray, Validators, FormControl
} from "@angular/forms";
import {PadletStoreService} from "../shared/padlet-store.service";
import {Padlet} from "../shared/padlet";
import {PadletErrorMessage, PadletErrorMessages} from "./padlet-form-error-messages";
import {EntryStoreService} from "../shared/entry-store.service";
import {UserStoreService} from "../shared/user-store.service";
import {User} from "../shared/user";
import {Userright} from "../shared/userright";
import {UserrightsStoreService} from "../shared/userrights-store.service";
import {UserFactory} from "../shared/user-factory";
import {UserrightFactory} from "../shared/userright-factory";
import {AuthenticationService} from "../shared/authentication.service";


@Component({
  selector: 'bs-padlet-form',
  templateUrl: './padlet-form.component.html',
  styles: []
})
export class PadletFormComponent implements OnInit {
  padletForm: FormGroup;
  padlet = PadletFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingPadlet = false;
  users: User[] = [];

  //userrights: Userright[] = [];

  constructor(
    private fb: FormBuilder,
    private ps: PadletStoreService,
    private es: EntryStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private us: UserStoreService,
    private ur: UserrightsStoreService,
    protected as: AuthenticationService
  ) {
    this.padletForm = this.fb.group({});
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isUpdatingPadlet = true;
      this.ps.getSingle(id).subscribe(padlet => {
        this.padlet = padlet;
        this.es.getAllEntries(id).subscribe(entries => this.padlet.entries = entries);
        this.initPadlet();
      });
    }
    this.getPeople();
    this.initPadlet();
  }

  getUserrights(user_id: number) {
    this.ur.getUserrightsOfPadletAndUser(this.padlet.id, user_id).subscribe(res => {
      // Find the corresponding User object
      const user = this.users.find(u => u.id === user_id);
      console.log(user);
      if (user) {
        if (!user.userrights) {
          user.userrights = []; // Initialize the Userrights array if it doesn't exist
        }
        user.userrights.push(res); // Push the res object into the Userrights array of the User object
      }
    });
  }

  getPeople() {
    this.us.getAllUsers().subscribe((u: User[]) => {
      //filter: owner of padlet should not be displayed
      this.users = u.filter(user => user.id !== this.padlet.user_id);

      this.users.forEach(user => {
        this.getUserrights(user.id);
        console.log(this.users);
      });
    });
  }

  updateUserRights(user: User, event: any, right: string) {
    const isChecked = event.target.checked;
    const userright: Userright = UserrightFactory.empty();
    userright.padlet_id = this.padlet.id;
    userright.user_id = user.id;
    if (isChecked) {
      //if userright edit, UR needs to be updated, UR already created
      if (right == 'edit') {
        console.log('checked and edit true');
        userright.edit = true;
        this.ur.updateUserRight(userright).subscribe(res => {
          this.router.navigate(["/admin/" + this.padlet.id],
            {relativeTo: this.route});
        });
      }
      //is UR is read, then it needs to be created, edit is wrong
      else {
        console.log('checked and edit false');
        userright.edit = false;
        this.ur.createUserRight(userright).subscribe(res => {
          this.router.navigate(["/admin/" + this.padlet.id],
            {relativeTo: this.route});
        });
      }
    } else {
      //unchecked read -> delete UR
      if (right === 'read') {
        console.log('read unchecked -> remove rights');
        this.ur.remove(this.padlet.id, user.id).subscribe(res => {
          this.router.navigate(["/admin/" + this.padlet.id],
            {relativeTo: this.route});
        });
      }
      // unchecked edit -> update UR 'edit' to false
      else {
        console.log('edit unchecked -> update rights');
        console.log(userright);
        userright.edit = false;
        this.ur.updateUserRight(userright).subscribe(res => {
          this.router.navigate(["/admin/" + this.padlet.id],
            {relativeTo: this.route});
        });
      }
    }

// Perform any additional actions or save the changes as needed

    console.log(user.userrights); // Output the updated userrights for verification
  }


  initPadlet() {
    this.padletForm = this.fb.group({
      id: this.padlet.id,
      title: [this.padlet.title, Validators.required],
      is_public: this.padlet.is_public,
      userrights: this.fb.array([])
    });

    // Populate the user rights in the form
    /* this.users.forEach(user => {

       console.log(user);
       this.addUserRights(user); // Custom function to add user rights to the form array

     });*/

    this.padletForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }

// Custom function to add user rights to the form array
  addUserRights(user
                  :
                  User
  ) {
    const userRights = this.padletForm.get('userrights') as FormArray;
    userRights.push(this.createRightsFormGroup(user));
  }

// Custom function to create a FormGroup for user rights
  createRightsFormGroup(user
                          :
                          User
  ):
    FormGroup {
    return this.fb.group({
      user_id: user.id,
      padlet_id: this.padlet.id,
      edit: false // Set edit permission to false initially
    });
  }

  submitForm() {
    const padlet: Padlet = PadletFactory.fromObject(this.padletForm.value);
    padlet.entries = this.padlet.entries;
    if (this.isUpdatingPadlet) {
      this.ps.update(padlet).subscribe(res => {
        this.router.navigate(['../../padlets', padlet.id], {
          relativeTo: this.route
        });
      });
    } else {
      padlet.user_id = this.as.getCurrentUserId();
      this.ps.create(padlet).subscribe(res => {
        this.padlet = PadletFactory.empty();
        this.padletForm.reset(PadletFactory.empty());
        this.router.navigate(["../padlets"],
          {relativeTo: this.route});
      });
    }
    console.log(this.padlet);
  }

  updateErrorMessages() {
    //console.log("Is invalid? " + this.padletForm.invalid);

    this.errors = {};
    for (const message of PadletErrorMessages) {
      const control = this.padletForm.get(message.forControl);
      if (control && control.dirty && control.invalid && control.errors
        && control.errors[message.forValidator] && !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
