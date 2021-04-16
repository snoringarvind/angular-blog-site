import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user = { fname: '', lname: '', email: '', username: '', password: '' };
  errors = <any>[];

  constructor(
    private userService: UserService,
    private blogService: BlogService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {}

  signup(): void {
    this.userService.signup(this.user).subscribe((res) => {
      console.log(res);

      if (res.error) {
        this.errors = res.error;
        this.errors = Array.isArray(res.error) ? this.errors : [this.errors];
        console.log(this.errors);
      } else {
        localStorage.setItem('jwtData', JSON.stringify(res.jwt));
        this.userService.jwt = res.jwt;

        this.errors = [];

        this.router.navigateByUrl('/');
      }
    });
  }
}
