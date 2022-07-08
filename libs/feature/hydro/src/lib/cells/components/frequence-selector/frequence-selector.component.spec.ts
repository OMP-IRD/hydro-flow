import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FrequenceSelectorComponent } from './frequence-selector.component'

describe('FrequenceSelectorComponent', () => {
  let component: FrequenceSelectorComponent
  let fixture: ComponentFixture<FrequenceSelectorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrequenceSelectorComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FrequenceSelectorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
