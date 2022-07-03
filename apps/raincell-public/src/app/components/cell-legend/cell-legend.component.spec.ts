import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellLegendComponent } from './cell-legend.component';

describe('CellLegendComponent', () => {
  let component: CellLegendComponent;
  let fixture: ComponentFixture<CellLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellLegendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
