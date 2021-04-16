import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getEnabledCategories } from 'node:trace_events';
import { Observable } from 'rxjs';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-update',
  templateUrl: './blog-update.component.html',
  styleUrls: ['./blog-update.component.css'],
})
export class BlogUpdateComponent implements OnInit {
  blog!: Blog;

  isReloaded: boolean = false;

  id = this.route.snapshot.paramMap.get('id');

  errors = <any>[];

  updating: boolean = false;

  constructor(
    public blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.blog = this.blogService.blog;

    if (!this.blogService.blog) {
      this.getBlog();
    }

    console.log(this.blog);
  }

  getBlog(): void {
    this.blogService.getBlog(this.id).subscribe((res) => {
      console.log(res);
      this.blog = res;
    });
  }

  updateBlog(): void {
    this.updating = true;

    this.blogService.updateBlog(this.id, this.blog).subscribe((res) => {
      console.log(res.error);

      if (res.error) {
        this.errors = res.error;
        this.errors = Array.isArray(this.errors) ? this.errors : [this.errors];
        for (let i = 0; i < this.errors.length; i++) {
          console.log(this.errors[i].msg);
        }
      } else {
        this.blogService.blog = this.blog;
        this.router.navigate([`/blog/${this.blog._id}`]);
      }
      this.updating = false;
    });
  }
}
