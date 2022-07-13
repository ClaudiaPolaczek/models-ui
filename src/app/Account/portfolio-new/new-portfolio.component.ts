import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuItem, Message} from 'primeng/api';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../authentication.service';
import {PortfolioService} from '../../Portfolios/portfolio/portfolio.service';
import {User} from '../../user';
import {InputTextareaModule} from 'primeng/inputtextarea';

@Component({
  selector: 'app-portfolio-new',
  templateUrl: './new-portfolio.component.html',
  styleUrls: ['./new-portfolio.component.css']
})
export class NewPortfolioComponent implements OnInit {

  items: MenuItem[];
  home: MenuItem;
  albumForm: FormGroup;
  msgs: Message[] = [];
  user: User;
  spin = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private portfolioService: PortfolioService) {
    this.albumForm = formBuilder.group({
      name: formBuilder.control('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      description: formBuilder.control('', [
        Validators.required
      ])
    }, {});
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(user =>
      this.user = user
    );
    this.items = [
      {label: 'Konto'},
      {label: 'Nowy album'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

  save(): void {
    this.spin = true;
    const controls = this.albumForm.controls;
    this.portfolioService.addPortfolio(
      this.user.id,
      controls.name.value,
      controls.description.value
    ).subscribe(user => {
      this.spin = false;
      this.router.navigate(['/user/portfolio']);
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Success', detail: 'Album został utworzony'});
    }, _ => {
      this.spin = false;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: 'Błąd podczas tworzenia albumu'});
    });
  }
}
