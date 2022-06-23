import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelProfilesComponent } from './model-profiles.component';

describe('ModelProfilesComponent', () => {
  let component: ModelProfilesComponent;
  let fixture: ComponentFixture<ModelProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
