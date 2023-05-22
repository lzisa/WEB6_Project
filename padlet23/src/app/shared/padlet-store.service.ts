import {Injectable} from '@angular/core';
import {Entry, Padlet} from "./padlet";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable()
export class PadletStoreService {
  private api = 'http://padlet23.s2010456035.student.kwmhgb.at/api';
  padlets: Padlet[] = [];

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<Padlet>> {
    return this.http.get<Array<Padlet>>(`${this.api}/padlets`).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }
  getOwnersPadlets(user_id: number): Observable<Array<Padlet>> {
    return this.http.get<Array<Padlet>>(`${this.api}/${user_id}/padlets`).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getPublicPadlets(): Observable<Array<Padlet>> {
    return this.http.get<Array<Padlet>>(`${this.api}/padlets/public`).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }
  getSingle(id: number): Observable<Padlet> {
    return this.http.get<Padlet>(`${this.api}/padlets/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  create(padlet: Padlet): Observable<any> {
    return this.http.post(`${this.api}/padlets`, padlet)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  update(padlet: Padlet): Observable<any> {
    return this.http.put(`${this.api}/padlets/${padlet.id}`, padlet)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.api}/padlets/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}



