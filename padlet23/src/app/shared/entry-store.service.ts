import {Injectable} from '@angular/core';
import {Entry} from "./entry";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

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

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
