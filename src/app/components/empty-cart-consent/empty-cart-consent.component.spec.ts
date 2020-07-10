import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyCartConsentComponent } from './empty-cart-consent.component';

describe('EmptyCartConsentComponent', () => {
  let component: EmptyCartConsentComponent;
  let fixture: ComponentFixture<EmptyCartConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyCartConsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyCartConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
