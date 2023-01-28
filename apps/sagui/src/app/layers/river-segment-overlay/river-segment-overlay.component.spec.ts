import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RiverSegmentOverlayComponent } from './river-segment-overlay.component'

describe('RiverSegmentOverlayComponent', () => {
  let component: RiverSegmentOverlayComponent
  let fixture: ComponentFixture<RiverSegmentOverlayComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RiverSegmentOverlayComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RiverSegmentOverlayComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
