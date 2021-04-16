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

  ngOnInit() {
    console.log(this.userService.isAuth);
    this.blogs = this.blogService.blogs;
    if (this.blogService.blogs.length === 0) {
      console.log('hello');
      this.getBlogs();
    }
    console.log(typeof Observable);
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
