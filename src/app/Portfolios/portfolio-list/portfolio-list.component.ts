import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AccountService} from '../../Account/account-user/account.service';
import {ProfileService} from '../../Profiles/profile/profile.service';
import {CalculatorService} from '../../calculator.service';
import {PortfolioService} from '../portfolio.service';
import {MenuItem, SelectItem} from 'primeng/api';
import {Table} from 'primeng/table';

export interface Portfolio {
  id?: number;
  email?: string;
  name?: string;
  description?: string;
  main_photo_url?: string;
  added_date?: string;
}

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent implements OnInit {

  items: MenuItem[];
  home: MenuItem;
  portfolioList: Portfolio[];
  loading = true;
  sortOptions: SelectItem[];
  @ViewChild('dv') dv: Table | undefined;

  constructor(private formBuilder: FormBuilder,
              public router: Router,
              private accountService: AccountService,
              private profileService: ProfileService,
              private portfolioService: PortfolioService,
              public calculatorService: CalculatorService) { }

  ngOnInit() {
    this.items = [
      {label: 'Portfolio'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
    this.portfolioService.getAllPortfolios().subscribe(portfolios => {
        this.portfolioList = portfolios.map((portfolio) => {
          return { id: portfolio.id, email: portfolio.user === null ? 'xxx' : portfolio.user.email,
            name: portfolio.name,
            description: portfolio.description, main_photo_url: portfolio.main_photo_url,
            added_date: this.calculatorService.getDate(portfolio.added_date)};
        });
      this.loading = false;
      });
    this.sortOptions = [
      {label: 'Data dodania malejąco', value: '!added_date'},
      {label: 'Data dodania rosnąco', value: 'added_date'},
      {label: 'Nazwa albumu', value: 'name'}
    ];
  }

  selectPortfolio(portfolio: Portfolio): void {
    this.router.navigate(['/portfolios/' + portfolio.id]);
  }
}
