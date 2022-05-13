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


const routes: Routes = [
  { path: '', component: AccountComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'profiles', component: ProfileComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'portfolios', component: PortfolioComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'photoshoot', component: PhotoshootComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
