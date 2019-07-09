import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageLoanComponent } from './average-loan.component';

describe('AverageLoanComponent', () => {
  let component: AverageLoanComponent;
  let fixture: ComponentFixture<AverageLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AverageLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
