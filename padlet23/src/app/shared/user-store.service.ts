import { Injectable } from '@angular/core';
import {User} from "./user";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Padlet} from "./padlet";

@Injectable()
export class UserStoreService {
  private api = 'http://padlet23.s2010456035.student.kwmhgb.at/api';
  users: User[] = [];

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.api}/users`).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }
  getSingle(id: number): Observable<User> {
    return this.http.get<User>(`${this.api}/users/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
