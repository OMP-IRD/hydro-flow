import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerContainerComponent } from './date-picker-container.component';

describe('DatePickerContainerComponent', () => {
  let component: DatePickerContainerComponent;
  let fixture: ComponentFixture<DatePickerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePickerContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
