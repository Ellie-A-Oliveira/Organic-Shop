import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSuccessfulComponent } from './update-successful.component';

describe('UpdateSuccessfulComponent', () => {
  let component: UpdateSuccessfulComponent;
  let fixture: ComponentFixture<UpdateSuccessfulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSuccessfulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
