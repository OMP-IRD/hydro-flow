import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SerieSelectorComponent } from './serie-selector.component'

describe('SerieSelectorComponent', () => {
  let component: SerieSelectorComponent
  let fixture: ComponentFixture<SerieSelectorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SerieSelectorComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SerieSelectorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
