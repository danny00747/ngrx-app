import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {User} from '@app/shared/model';
import {catchError, tap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {log} from "util";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'api/users';

  cities$: Observable<string[]> = this.http.get<User[]>(this.usersUrl)
    .pipe(
      map((users: User[]) => [...new Set(users.map(u => u.address.city))]),
      catchError(this.handleError)
    );

  constructor(private http: HttpClient) {
  }

  getUsers(city?: string): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        map((data: User[]) => (city) ? data.filter((u: User) => u.address.city === city) : data),
        // tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  getUsersByCity(city: string): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        map(data => data.filter(u => u.address.city === city)),
        catchError(this.handleError)
      );
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.usersUrl, user)
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }


  handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }


}
