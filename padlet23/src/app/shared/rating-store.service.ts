import {Injectable, OnInit} from '@angular/core';
import {Entry} from "./entry";
import {Rating} from "./rating";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RatingStoreService{
  private api = 'http://padlet23.s2010456035.student.kwmhgb.at/api';
  ratings: Rating[] = [];
  constructor(private http: HttpClient) { }

  getRatingsForEntry(padlet_id: number, entry_id: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.api}/padlets/${padlet_id}/entries/${entry_id}/ratings`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getRatingOfUserForEntry(entry: Entry, user_id: number): Observable<Rating>{
    return this.http.get<Rating>(`${this.api}/padlets/${entry.padlet_id}/entries/${entry.id}/rating/${user_id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }
  create(padlet_id: number, rating: Rating): Observable<any> {
    return this.http.post<Rating>(`${this.api}/padlets/${padlet_id}/entries/${rating.entry_id}/ratings/${rating.user_id}`, rating)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }
  removeRating(padlet_id: number, entry_id: number, user_id: number): Observable<any> {
    return this.http.delete(`${this.api}/padlets/${padlet_id}/entries/${entry_id}/rating/${user_id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
