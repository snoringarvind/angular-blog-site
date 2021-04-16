import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
})
export class BlogCreateComponent implements OnInit {
  blog: Blog = { title: '', content: '', _id: '' };

  errors = <any>[];

  creating: boolean = false;

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {}

  createBlog(blog: Blog) {
    this.creating = true;
    this.blogService.createBlog(blog).subscribe((res) => {
      if (res.error) {
        this.errors = Array.isArray(res.error) ? res.error : [res.error];
      } else {
        this.errors = [];
        this.blog._id = res._id;
        this.blogService.blogs.push(blog);
        console.log(this.blogService.blogs);
        this.router.navigateByUrl(`/blog/${res._id}`);
      }
      this.creating = false;
    });
  }
}
