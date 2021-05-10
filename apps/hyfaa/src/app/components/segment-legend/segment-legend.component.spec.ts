import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentLegendComponent } from './segment-legend.component';

describe('SegmentLegendComponent', () => {
  let component: SegmentLegendComponent;
  let fixture: ComponentFixture<SegmentLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentLegendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
