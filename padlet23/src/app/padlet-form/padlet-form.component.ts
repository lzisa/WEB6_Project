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


  constructor(
    private fb: FormBuilder,
    private ps: PadletStoreService,
    private es: EntryStoreService,
    private route: ActivatedRoute,
    private router: Router
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
    this.initPadlet();
  }

  initPadlet() {
    this.padletForm = this.fb.group({
      id: this.padlet.id,
      title: [this.padlet.title, Validators.required]
    });

    this.padletForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
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
      padlet.user_id = 1; //TODO: change later
      this.ps.create(padlet).subscribe(res => {
        this.padlet = PadletFactory.empty();
        this.padletForm.reset(PadletFactory.empty());
        this.router.navigate(["../padlets"],
          {relativeTo: this.route});
      });
    }
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
