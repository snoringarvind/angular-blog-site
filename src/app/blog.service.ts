import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry, tap } from 'rxjs/operators';
import { Blog } from './blog';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogsUrl = 'http://localhost:3000/api';

  blog!: Blog;

  blogs: Blog[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient, private userService: UserService) {}

  getBlogs(): Observable<any> {
    return this.http.get(`${this.blogsUrl}/blogs`).pipe(
      tap((_) => console.log('fecthed data')),
      catchError((err) => of(err))
    );
  }

  getBlog(_id: any): Observable<any> {
    console.log(_id);
    const url = `${this.blogsUrl}/blog/${_id}`;
    return this.http.get(url).pipe(
      tap((_) => console.log('fetched blog')),
      catchError((err) => of(err))
    );
  }

  updateBlog(id: any, data: any): Observable<any> {
    const url = `${this.blogsUrl}/blog/${id}`;
    return this.http
      .put(url, data, {
        headers: { authorization: `Bearer ${this.userService.jwt.token}` },
      })
      .pipe(
        tap((_) => console.log('updating blog')),
        catchError(this.handleError<any>('updateBlog'))
      );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      return of(error);
    };
  }

  deleteBlog(id: any): Observable<any> {
    const url = `${this.blogsUrl}/blog/${id}`;
    return this.http
      .delete(url, {
        headers: { authorization: `Bearer ${this.userService.jwt.token}` },
      })
      .pipe(
        tap((_) => console.log('deleting blog')),
        catchError(this.handleError<any>('deleteBlog'))
      );
  }

  createBlog(data: any): Observable<any> {
    const url = `${this.blogsUrl}/blogs`;
    return this.http
      .post(url, data, {
        headers: { authorization: `Bearer ${this.userService.jwt.token}` },
      })
      .pipe(
        tap((_) => console.log('creating blog')),
        catchError(this.handleError<any>('creating blog'))
      );
  }

  getComments(blog_id: any): Observable<any> {
    const url = `${this.blogsUrl}/blog/${blog_id}/comment`;
    return this.http.get(url).pipe(
      tap((_) => console.log('getting comments')),
      catchError(this.handleError<any>('getting comments'))
    );
  }

  postComment(blog_id: any, comment: any): Observable<any> {
    console.log(comment);
    console.log(this.userService.jwt.token);
    const url = `${this.blogsUrl}/blog/${blog_id}/comment`;
    return this.http
      .post(url, comment, {
        headers: { authorization: `Bearer ${this.userService.jwt.token}` },
      })
      .pipe(
        tap((_) => console.log('posting comments')),
        catchError(this.handleError<any>('posting comments'))
      );
  }

  deleteComment(blog_id: any, comment_id: any): Observable<any> {
    const url = `${this.blogsUrl}/blog/${blog_id}/comment/${comment_id}`;

    return this.http
      .delete(url, {
        headers: { authorization: `Bearer ${this.userService.jwt.token}` },
      })
      .pipe(
        tap((_) => console.log('deleting comment')),
        catchError(this.handleError<any>('deleting comment'))
      );

    return of();
  }
}
