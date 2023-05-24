import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {User} from "./user";
import {Userright} from "./userright";
import {AuthenticationService} from "./authentication.service";
import {Entry} from "./entry";

@Injectable({
  providedIn: 'root'
})
export class UserrightsStoreService {
  private api = 'http://padlet23.s2010456035.student.kwmhgb.at/api';

  userrights: Userright[] = [];

  constructor(private http: HttpClient, private authServ: AuthenticationService) {
  }

  /**
   * checks if item_id (for example user_id of padlet) is the same as logged in user
   * @param item_id
   */
  checkifIsOwner(item_id: number) {
    console.log(item_id, this.authServ.getCurrentUserId());
    return this.authServ.getCurrentUserId() == item_id;
  }


  getAllUserrightsForPadlet(padlet_id: number): Observable<Array<Userright>>{
    return this.http.get<Array<Userright>>(`${this.api}/padlets/${padlet_id}/userrights`).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getUserrightsOfPadletAndUser(padlet_id: number, user_id: number): Observable<Userright>{
    return this.http.get<Userright>(`${this.api}/padlets/${padlet_id}/userrights/${user_id}`).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }
  getAllSharedPadletsWithUser(user_id: number): Observable<Array<Userright>> {
    return this.http.get<Array<Userright>>(`${this.api}/padlets/${user_id}/sharedPadlets`).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  createUserRight(userright: Userright): Observable<any>{
    return this.http.post(`${this.api}/userrights`, userright )
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  updateUserRight(userright: Userright): Observable<any>{
    return this.http.put(`${this.api}/admin/${userright.padlet_id}/userrights/${userright.user_id}`, userright )
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }
  remove(padlet_id: number, user_id: number): Observable<any> {
    return this.http.delete(`${this.api}/admin/${padlet_id}/userrights/${user_id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }



}
