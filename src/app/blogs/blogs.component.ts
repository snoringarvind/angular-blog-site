import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogService } from '../blog.service';
import { Blog } from '../blog';
import { ThrowStmt } from '@angular/compiler';
import { browser } from 'protractor';
import { User } from '../user';
import { UserService } from '../user.service';
import { state } from '@angular/animations';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private router: Router,
    private userService: UserService
  ) {}

  blogs: Blog[] = [];

  threshold: any = 1;
  rootMargin: any = '0px';

  target: any = document.getElementById('blog-card');

  ngOnInit() {
    console.log(this.userService.isAuth);
    this.blogs = this.blogService.blogs;

    if (this.blogService.blogs.length === 0) {
      console.log('hello');
      this.getBlogs();
    }
    console.log(typeof Observable);

    console.log(this.target);
    this.blogService
      .useIntersection({
        target: this.target,
        onIntersect: ([{ isIntersecting }]: any, observerElement: any) => {
          if (isIntersecting) {
            console.log('hey broooooooooooooooooooo');
          }
          console.log(this.target);
          console.log(isIntersecting, observerElement);
        },
        threshold: this.threshold,
        rootMargin: this.rootMargin,
      })
      .subscribe((res) => console.log(res));
  }

  cb() {
    console.log('mannnn');
  }

  getBlogs(): void {
    this.blogService.getBlogs().subscribe((res) => {
      this.blogService.blogs = res;
      this.blogs = this.blogService.blogs;
    });
  }

  blogDetail(blog: Blog, index: number): void {
    this.blogService.blog = blog;
    this.router.navigate([`/blog/${blog._id}`], { state: { index: index } });
  }
}
