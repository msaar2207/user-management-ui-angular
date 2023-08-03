import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.gaurd';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./components/authentication/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./components/authentication/registration/registration.module').then(m => m.RegistrationModule) },
  { path: 'users', loadChildren: () => import('./components/User/user-list/user-list.module').then(m => m.UserListModule), canActivate: [AuthGuard] },
  { path: 'users/:id', loadChildren: () => import('./components/User/user-details/user-details.module').then(m => m.UserDetailsModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
