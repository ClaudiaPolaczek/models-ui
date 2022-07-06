import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPortfoliosComponent } from './account-portfolios.component';

describe('AccountPortfoliosComponent', () => {
  let component: AccountPortfoliosComponent;
  let fixture: ComponentFixture<AccountPortfoliosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPortfoliosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPortfoliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
