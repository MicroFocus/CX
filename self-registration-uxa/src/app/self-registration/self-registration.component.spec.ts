import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfRegistrationComponent } from './self-registration.component';

describe('AdministrationComponent', () => {
  let component: SelfRegistrationComponent;
  let fixture: ComponentFixture<SelfRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
