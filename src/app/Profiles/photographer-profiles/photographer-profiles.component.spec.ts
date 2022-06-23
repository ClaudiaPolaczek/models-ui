import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographerProfilesComponent } from './photographer-profiles.component';

describe('PhotographerProfilesComponent', () => {
  let component: PhotographerProfilesComponent;
  let fixture: ComponentFixture<PhotographerProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographerProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographerProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
