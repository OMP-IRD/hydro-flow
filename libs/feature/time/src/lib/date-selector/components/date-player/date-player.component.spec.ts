import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DatePlayerComponent } from './date-player.component'

describe('DatePlayerComponent', () => {
  let component: DatePlayerComponent
  let fixture: ComponentFixture<DatePlayerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatePlayerComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DatePlayerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
