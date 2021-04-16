import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';
import { UserService } from '../user.service';
import { Comment } from '../comment';
import { unescapeIdentifier } from '@angular/compiler';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  constructor(
    public blogService: BlogService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  comment_errors = <any>[];

  blog_errors = <any>[];

  id = this.route.snapshot.paramMap.get('id');

  blog!: Blog;

  commentObj = <{ comment: string }>{};

  comment_list: Comment[] = [];

  local_isAuth: boolean = false;

  ngOnInit(): void {
    this.blog = this.blogService.blog;

    this.local_isAuth = this.userService.jwt.admin || false;

    console.log(this.local_isAuth);

    if (!this.blogService.blog) {
      this.getBlog();
    }

    this.getComments();
  }

  getBlog(): void {
    this.blogService.getBlog(this.id).subscribe((res) => {
      this.blogService.blog = res;
      this.blog = this.blogService.blog;
    });
  }

  deleteBlog(): void {
    this.blogService.deleteBlog(this.id).subscribe((res) => {
      if (res.error) {
        this.blog_errors = res.error;
        if (!Array.isArray(this.blog_errors)) {
          this.blog_errors = [this.blog_errors];
        }
      } else {
        console.log(res);
      }
    });

    const index = window.history.state.index;

    if (this.userService.jwt.admin) {
      this.blogService.blogs.splice(index, 1);
      this.router.navigateByUrl('/');
    }
  }

  getComments(): void {
    this.blogService.getComments(this.id).subscribe((res) => {
      if (res.msg === 'no comments found') {
        return;
      } else {
        this.comment_list = res;
      }
    });
  }

  postComment(): void {
    console.log(this.comment_list);
    console.log(this.userService.jwt.token);
    this.blogService.postComment(this.id, this.commentObj).subscribe((res) => {
      if (res.error) {
        this.comment_errors = Array.isArray(res.error)
          ? res.error
          : [res.error];

        console.log(this.comment_errors);
      } else {
        this.comment_errors = [];
      }
    });

    console.log(this.comment_list);
    console.log(this.commentObj.comment);
    if (this.userService.isAuth && this.commentObj.comment !== undefined) {
      console.log('helllooooo');
      this.comment_list = [
        ...this.comment_list,
        {
          comment: this.commentObj.comment,
          user: { fname: this.userService.jwt.fname },
          _id: '',
        },
      ];

      this.commentObj.comment = '';
    }
  }

  commentDelete(index: number, comment_id: any): void {
    this.comment_list.splice(index, 1);
    console.log(this.comment_list);

    this.blogService.deleteComment(index, comment_id).subscribe((res) => {});
  }
}
