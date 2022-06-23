import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInstagramComponent } from './account-instagram.component';

describe('AccountInstagramComponent', () => {
  let component: AccountInstagramComponent;
  let fixture: ComponentFixture<AccountInstagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountInstagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountInstagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
