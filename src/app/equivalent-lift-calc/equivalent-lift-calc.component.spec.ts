import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquivalentLiftCalcComponent } from './equivalent-lift-calc.component';

describe('EquivalentLiftCalcComponent', () => {
  let component: EquivalentLiftCalcComponent;
  let fixture: ComponentFixture<EquivalentLiftCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquivalentLiftCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquivalentLiftCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
