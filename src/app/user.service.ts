import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BlogService } from './blog.service';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private blogsUrl = 'http://localhost:3000/api';

  jwt = <{ token: string; admin: boolean; fname: string }>{};

  isAuth: boolean = false;
  constructor(private http: HttpClient, private router: Router) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        console.log(e);
      }
    });
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.blogsUrl}/blogs/login`, data).pipe(
      tap((_) => console.log('logging user')),
      catchError(this.handleError())
    );
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.blogsUrl}/blogs/signup`, data).pipe(
      tap((_) => console.log('signing-up user')),
      catchError(this.handleError())
    );
  }

  checkUserLogin(token: string): Observable<any> {
    const headers = { authorization: `Bearer ${token}` };
    console.log(headers);
    return this.http
      .post(`${this.blogsUrl}/blogs/is-guest-verified`, '', {
        headers: headers,
      })
      .pipe(
        tap((_) => console.log('verifying jwt')),
        catchError(this.handleError())
      );
  }

  private handleError() {
    return (error: any): Observable<any> => {
      return of(error);
    };
  }
}
