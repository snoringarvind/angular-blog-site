import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogUpdateComponent } from './blog-update/blog-update.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    BlogDetailComponent,
    BlogUpdateComponent,
    LoginComponent,
    SignupComponent,
    BlogCreateComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
