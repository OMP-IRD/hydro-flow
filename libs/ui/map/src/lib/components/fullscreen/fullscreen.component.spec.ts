import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing'
import { FullscreenComponent } from './fullscreen.component'

fdescribe('FullscreenComponent', () => {
  let component: FullscreenComponent
  let fixture: ComponentFixture<FullscreenComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FullscreenComponent],
      providers: [],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FullscreenComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('creates', () => {
    expect(component).toBeTruthy()
  })
})
