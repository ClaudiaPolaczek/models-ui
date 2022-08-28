import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, MenuItem, Message, MessageService} from 'primeng/api';
import {User} from '../../user';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../authentication.service';
import {PortfolioService} from '../../Portfolios/portfolio.service';
import {CalculatorService} from '../../calculator.service';

export class Portfolio {
  constructor(
    public id: number = 0,
    public user: User,
    public name: string,
    public description: string,
    public main_photo_url: string,
    public added_date: Date
  ) {}
}

@Component({
  selector: 'app-account-portfolios',
  templateUrl: './account-portfolios.component.html',
  styleUrls: ['./account-portfolios.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AccountPortfoliosComponent implements OnInit {

  items: MenuItem[];
  home: MenuItem;
  msgs: Message[] = [];
  user: User;
  portfolios: Portfolio[] = [];
  spin = false;

  constructor(private router: Router,
              private authService: AuthenticationService,
              private portfolioService: PortfolioService,
              private confirmationService: ConfirmationService,
              public calculatorService: CalculatorService) {
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(user =>
      this.user = user
    );
    this.portfolioService.getAllByUser(this.user.email).subscribe(portfolios =>
      this.portfolios = portfolios
    );
    this.items = [
      {label: 'Konto'},
      {label: 'Albumy'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

  deletePortfolio(portfolio): void {
      this.confirmationService.confirm({
        message: 'Czy na pewno chcesz usunąć album?',
        header: 'Potwierdzenie',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.portfolioService.deletePortfolioById(portfolio.id).subscribe(() => {
              this.msgs = [];
              this.msgs.push({severity: 'info', summary: 'Success', detail: 'Deleted portfolio'});
              window.location.reload();
            }, _ => {
              this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'Error'}];
            });
        },
        reject: () => {
          this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'Anulowane'}];
        }
      });
  }

  editPortfolio(portfolio): void {
    this.router.navigate(['/edit/portfolio', {id: portfolio.id}]);
  }
}
