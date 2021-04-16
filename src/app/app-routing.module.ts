import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogUpdateComponent } from './blog-update/blog-update.component';
import { BlogsComponent } from './blogs/blogs.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
  { path: 'blogs', component: BlogsComponent },
  { path: 'blog/login', component: LoginComponent, pathMatch: 'full' },
  { path: 'blog/signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'blog/create', component: BlogCreateComponent, pathMatch: 'full' },
  { path: 'blog/:id', component: BlogDetailComponent },
  { path: 'blog/:id/update', component: BlogUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
