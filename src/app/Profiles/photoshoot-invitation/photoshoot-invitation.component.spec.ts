import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoshootInvitationComponent } from './photoshoot-invitation.component';

describe('PhotoshootInvitationComponent', () => {
  let component: PhotoshootInvitationComponent;
  let fixture: ComponentFixture<PhotoshootInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoshootInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoshootInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
