import {Injectable} from '@angular/core';
import {Entry, Padlet} from "./padlet";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Comment} from "./comment";


@Injectable()
export class CommentStoreService {
  private api = 'http://padlet23.s2010456035.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {
  }

  getAllCommentsFromPadletFromEntry(padlet_id: number, entry_id: number): Observable<Comment[]> {
    return this.http.get<Entry[]>(`${this.api}/padlets/${padlet_id}/entries/${entry_id}/comments`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  create(comment: Comment, padlet_id: number): Observable<any> {
    return this.http.post(`${this.api}/padlets/${padlet_id}/entries/${comment.entry_id}/comments`, comment)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
