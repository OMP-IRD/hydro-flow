import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing'
import ControlScaleLine from 'ol/control/ScaleLine'
import { ScaleLineComponent } from './scale-line.component'

describe('ScaleLineComponent', () => {
  let component: ScaleLineComponent
  let fixture: ComponentFixture<ScaleLineComponent>

  const viewMock = {
    on: jest.fn(),
    un: jest.fn(),
    getResolution: function () {
      return 13.2291595229205
    },
  }

  const mapMock = {
    addControl: jest.fn(),
    getView: function () {
      return viewMock
    },
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ScaleLineComponent],
      providers: [],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleLineComponent)
    component = fixture.componentInstance
    component.map = mapMock
    fixture.detectChanges()
  })

  it('creates', () => {
    expect(component).toBeTruthy()
  })

  describe('on init', () => {
    it('instanciate scaleline control', () => {
      expect(component.control).toEqual(jasmine.any(ControlScaleLine))
    })

    it('adds scaleline control', () => {
      expect(mapMock.addControl).toHaveBeenCalledWith(component.control)
    })

    it('sets initial value to scale denominator', () => {
      // Jest doesn't support locale specific
      expect(component.scaleDenominator).toBe('50,000')
    })

    it('adds listener for resolution change on view', () => {
      expect(viewMock.on).toHaveBeenCalledWith(
        'change:resolution',
        component.onResolutionChange
      )
    })
  })

  describe('on change resolution', () => {
    const eventMock = {
      target: {
        getResolution: function () {
          return 13.2291595229205
        },
      },
    }
    beforeEach(() => {
      component.onResolutionChange(eventMock)
    })
    it('updates rounded and formatted scale denominator', () => {
      // Jest doesn't support locale specific
      expect(component.scaleDenominator).toBe('50,000')
    })
  })

  describe('on destroy', () => {
    beforeEach(() => {
      component.ngOnDestroy()
    })
    it('remove listener for resolution change on view', () => {
      expect(viewMock.un).toHaveBeenCalledWith(
        'change:resolution',
        component.onResolutionChange
      )
    })
  })
})
