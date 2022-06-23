import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoshootComponent } from './photoshoot.component';

describe('PhotoshootComponent', () => {
  let component: PhotoshootComponent;
  let fixture: ComponentFixture<PhotoshootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoshootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoshootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
