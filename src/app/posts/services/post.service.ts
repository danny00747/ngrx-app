import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Post} from '@app/shared/model/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postUrl = 'api/posts';

  constructor(private http: HttpClient) {}

  getUserPosts(userId?: number): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl + `?userId=${userId}`)
      .pipe(
        // map((posts: Post[]) => posts.filter((p: Post) => p.userId === userId)),
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
