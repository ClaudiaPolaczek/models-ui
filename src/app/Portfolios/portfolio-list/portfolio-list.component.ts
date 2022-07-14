import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../Account/account-user/account.service';
import {ProfileService} from '../../Profiles/profile/profile.service';
import {AuthenticationService} from '../../authentication.service';
import {NGXLogger} from 'ngx-logger';
import {CalculatorService} from '../../calculator.service';
import {PortfolioService} from '../portfolio/portfolio.service';
import {FilterService, MenuItem, SelectItem} from 'primeng/api';
import {User} from '../../user';
import {Model} from '../../Profiles/model-profiles/model-profiles.component';
import {Table} from 'primeng/table';

export interface Portfolio {
  id?: number;
  email?: string;
  name?: string;
  description?: number;
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
  sortKey: string;
  sortField: string;
  sortOrder: number;
  @ViewChild('dv') dv: Table | undefined;

  constructor(private formBuilder: FormBuilder,
              public router: Router,
              private accountService: AccountService,
              private profileService: ProfileService,
              private portfolioService: PortfolioService,
              private authService: AuthenticationService,
              private logger: NGXLogger,
              private filterService: FilterService,
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
            description: portfolio.description, main: portfolio.main_photo_url,
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

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  loadData(event) {
    //event.first = First row offset
    //event.rows = Number of rows per page
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dv?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }
}
