import { Component, OnInit } from '@angular/core';
import { getEnabledCategories } from 'node:trace_events';
import { BlogService } from './blog.service';
import { Blog } from './blog';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'blog-site';
  errors = <any>[];

  constructor(public userService: UserService, private router: Router) {}

  loading: boolean = true;

  ngOnInit(): void {
    console.log('hello inside app component !!');
    console.log(this.userService.isAuth);

    console.log(this.userService.jwt.token);
    if (!this.userService.isAuth) {
      if (!this.userService.jwt.token) {
        const x = localStorage.getItem('jwtData');
        if (x) {
          this.userService.jwt = JSON.parse(x);
        }
      }

      if (this.userService.jwt.token) {
        this.userService
          .checkUserLogin(this.userService.jwt.token)
          .subscribe((res) => {
            if (res.msg) {
              console.log(res.msg);
              this.userService.isAuth = res.msg.isAuthenticated;

              console.log(this.userService.isAuth);

              this.errors = [];
            } else if (res.error) {
              this.errors =
                this.errors.length !== 0 ? this.errors : [this.errors];
            }
            this.loading = false;
          });
      } else {
        this.userService.isAuth = false;
        this.loading = false;
      }
    }
  }

  logClick(): void {
    if (this.userService.isAuth) {
      localStorage.clear();
      window.location.reload();
    } else {
      this.router.navigateByUrl('/blog/login');
    }
  }

  blogClick(): void {
    this.router.navigateByUrl('/');
  }

  createClick(): void {
    this.router.navigateByUrl('/blog/create');
  }
  isActive(url: string) {
    const y = this.router.isActive(url, true);

    return y;
  }
}
