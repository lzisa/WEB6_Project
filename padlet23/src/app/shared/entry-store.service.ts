import {Injectable} from '@angular/core';
import {Entry} from "./entry";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Padlet} from "./padlet";

@Injectable()
export class EntryStoreService {
  private api = 'http://padlet23.s2010456035.student.kwmhgb.at/api';
  entries: Entry[] = [];

  constructor(private http: HttpClient) {
  }

  getAllEntries(id: number): Observable<Entry[]> {
    return this.http.get<Entry[]>(`${this.api}/padlets/${id}/entries`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }
  getEntryByID(padlet_id: number, entry_id: number): Observable<Entry> {
    return this.http.get<Entry>(`${this.api}/padlets/${padlet_id}/entries/${entry_id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  update(entry: Entry): Observable<any> {
    return this.http.put(`${this.api}/padlets/${entry.padlet_id}/entries/${entry.id}`, entry)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(entry: Entry): Observable<any> {
    return this.http.post(`${this.api}/padlets/${entry.padlet_id}/entries`, entry)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  remove(padlet_id: number, entry_id: number): Observable<any> {
    return this.http.delete(`${this.api}/padlets/${padlet_id}/entries/${entry_id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
