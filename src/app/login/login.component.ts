import { JsonpClientBackend } from '@angular/common/http';
import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { copyFileSync } from 'node:fs';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = { username: '', password: '' };
  errors = <any>[];
  isLogging: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.isLogging = true;
    this.userService.login(this.user).subscribe((res) => {
      console.log(res);
      if (res.error) {
        this.errors = res.error;
        if (!Array.isArray(this.errors)) {
          this.errors = [this.errors];
        }
      } else {
        this.errors = [];
        this.userService.jwt = res.jwt;
        this.userService.isAuth = true;
        console.log(this.userService.jwt);
        localStorage.setItem('jwtData', JSON.stringify(this.userService.jwt));

        this.router.navigateByUrl('/');
      }
      this.isLogging = false;
    });
  }
}
