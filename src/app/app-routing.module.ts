import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from './auth.guard';
// import { HistoryComponent } from './history/history.component';
// import { FriendsComponent} from './friends/friends.component';
// import {LoginComponent} from './login/login.component';
// import {AuthGuard} from './auth.guard';

const routes: Routes = [
 // { path: '', component: RouteComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
 // { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
 // { path: 'friends', component: FriendsComponent, canActivate: [AuthGuard] },
  // { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
