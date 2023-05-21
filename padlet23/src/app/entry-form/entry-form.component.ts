import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {EntryFactory} from "../shared/entry-factory";
import {PadletStoreService} from "../shared/padlet-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Entry} from "../shared/entry";
import {EntryStoreService} from "../shared/entry-store.service";
import {EntryErrorMessages} from "./entry-form-error-messages";
import {PadletFactory} from "../shared/padlet-factory";
import {CommentStoreService} from "../shared/comment-store.service";

@Component({
  selector: 'bs-entry-form',
  templateUrl: './entry-form.component.html',
  styles: []
})

export class EntryFormComponent implements OnInit {
  entryForm: FormGroup;
  entry = EntryFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingEntry = false;

  constructor(
    private fb: FormBuilder,
    private es: EntryStoreService,
    private cs:CommentStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.entryForm = this.fb.group({});
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    const entry_id = params['entry_id'];
    const padlet_id = params['padlet_id'];

    if (entry_id) {
      this.isUpdatingEntry = true;
      this.es.getEntryByID(padlet_id, entry_id).subscribe(entry => {
        this.entry = entry;
      this.cs.getAllCommentsFromPadletFromEntry(padlet_id, entry_id)
        .subscribe(comments => this.entry.comments = comments);
        this.initEntry();
      });
    }
    this.initEntry();
  }

  initEntry() {
    this.entryForm = this.fb.group({
      id: this.entry.id,
      padlet_id: this.entry.padlet_id,
      title: [this.entry.title, Validators.required],
      text: this.entry.text
    });
    this.entryForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }

  submitForm() {
    const entry: Entry = EntryFactory.fromObject(this.entryForm.value);
    if (this.isUpdatingEntry) {
      console.log("entry gets updated");
      this.es.update(entry).subscribe(res => {
        this.router.navigate(['../../../../../padlets/' + entry.padlet_id], {
          relativeTo: this.route
        });
      })
    } else {
      entry.user_id = 1; //TODO: change later when user authentication successful
      entry.padlet_id = this.route.snapshot.params['padlet_id'];
      this.es.create(entry).subscribe(res => {
        this.entry = EntryFactory.empty();

        this.entryForm.reset(PadletFactory.empty());
        this.router.navigate(['../../../../padlets/' + entry.padlet_id], {
          relativeTo: this.route
        });
      });
    }
  }

  updateErrorMessages() {
    console.log("Is invalid? " + this.entryForm.invalid);
    this.errors = {};
    for (const message of EntryErrorMessages) {
      const control = this.entryForm.get(message.forControl);
      if (control && control.dirty && control.invalid && control.errors
        && control.errors[message.forValidator] && !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
