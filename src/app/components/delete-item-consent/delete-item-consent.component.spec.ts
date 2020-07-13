import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteItemConsentComponent } from './delete-item-consent.component';

describe('DeleteItemConsentComponent', () => {
  let component: DeleteItemConsentComponent;
  let fixture: ComponentFixture<DeleteItemConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteItemConsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteItemConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
