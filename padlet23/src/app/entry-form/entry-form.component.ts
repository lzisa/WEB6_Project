import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {EntryFactory} from "../shared/entry-factory";
import {PadletStoreService} from "../shared/padlet-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Entry} from "../shared/entry";
/*
@Component({
  selector: 'bs-entry-form',
  templateUrl: './entry-form.component.html',
  styles: [
  ]
})

export class EntryFormComponent implements OnInit{
  entryForm: FormGroup;
  entry = EntryFactory.empty();
  errors: {[key: string]: string} ={};
  isUpdatingEntry = false;

  constructor(
    private fb: FormBuilder,
    private ps: PadletStoreService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.entryForm = this.fb.group({});
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if(id){
      this.isUpdatingEntry = true;
      this.ps.getSingle(id).subscribe(entry =>{
        this.entry = entry;
        this.initEntry();
      });
    }
    this.initEntry();
  }

  initEntry(){
    this.entryForm = this.fb.group({
      id: this.entry.id,
      title: this.entry.title,
      text: this.entry.text
    });
    this.entryForm.statusChanges.subscribe(()=>
    this.updateErrorMessages());
  }

  submitForm(){
    const entry: Entry = EntryFactory.fromObject(this.entryForm.value);

    if(this.isUpdatingEntry){
     // this.ps.update(entry).subscribe(res=>{

     // })
    }
  }
}*/
