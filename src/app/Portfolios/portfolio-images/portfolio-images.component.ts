import { Component, OnInit } from '@angular/core';
import {FilterService, MenuItem, Message} from 'primeng/api';
import {Portfolio} from '../portfolio-list/portfolio-list.component';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../Account/account-user/account.service';
import {ProfileService} from '../../Profiles/profile/profile.service';
import {PortfolioService} from '../portfolio.service';
import {AuthenticationService} from '../../authentication.service';
import {NGXLogger} from 'ngx-logger';
import {CalculatorService} from '../../calculator.service';

export interface Image {
  id?: number;
  portfolio?: Portfolio;
  url?: string;
  name?: string;
  date?: string;
}

@Component({
  selector: 'app-portfolio-images',
  templateUrl: './portfolio-images.component.html',
  styleUrls: ['./portfolio-images.component.css']
})
export class PortfolioImagesComponent implements OnInit {

  items: MenuItem[];
  home: MenuItem;
  portfolio: Portfolio;
  images: Image[];
  portfolioId: number;
  loading = true;
  msgs: Message[] = [];

  responsiveOptions:any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(public router: Router,
              private route: ActivatedRoute,
              private accountService: AccountService,
              private profileService: ProfileService,
              private portfolioService: PortfolioService,
              private authService: AuthenticationService,
              private logger: NGXLogger,
              public calculatorService: CalculatorService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.portfolioId = +this.route.snapshot.paramMap.get('id');
    });
    this.portfolioService.findById(this.portfolioId).subscribe(portfolio => {
      this.portfolio = portfolio;
      console.log(this.portfolio);
      this.portfolioService.getImagesByPortfolio(this.portfolioId).subscribe(images => {
        this.images = images.map((image) => {
          return {
            id: image.id, portfolio: image.portfolio, file_url: image.file_url,
            url: image.file_url, date: this.calculatorService.getDate(image.added_date)
          };
        });
      });
      console.log(this.images);
      this.loading = false;
    });
    this.items = [
      {label: 'Portfolio'}
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
