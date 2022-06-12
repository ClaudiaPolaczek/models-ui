import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from './auth.guard';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PhotoshootComponent } from './photoshoot/photoshoot.component';
import { AppComponent } from './app.component';
import {RegisterComponent} from './register/register.component';


const routes: Routes = [
  {
    path: '',
    component: AccountComponent/*, canActivate: [AuthGuard]*/
  },
  { path: 'profiles', pathMatch: 'full', component: ProfileComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'account', pathMatch: 'full', component: AccountComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'portfolios', pathMatch: 'full', component: PortfolioComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'photoshoot', pathMatch: 'full', component: PhotoshootComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'register', pathMatch: 'full', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
