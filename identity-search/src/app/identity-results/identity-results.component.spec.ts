import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityResultsComponent } from './identity-results.component';

describe('IdentityResultsComponent', () => {
  let component: IdentityResultsComponent;
  let fixture: ComponentFixture<IdentityResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
