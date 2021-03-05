import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing'

import { MousePositionComponent } from './mouse-position.component'
import { CoordinateFormatterService } from './coordinate-formatter.service'
import { createSpyObj } from 'jest-createspyobj'

describe('MousePositionComponent', () => {
  let component: MousePositionComponent
  let fixture: ComponentFixture<MousePositionComponent>
  const coordinateFormatterServiceMock = createSpyObj(
    'CoordinateFormatterService',
    ['numberCoordinates', 'dmsCoordinates']
  )

  const mapMock = {
    addControl: function () {},
  }

  const formatByProjectionMock = new Map([
    ['EPSG:4326', 'dmsCoordinates:5:{x} - {y}'],
  ])

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MousePositionComponent],
        providers: [
          {
            provide: CoordinateFormatterService,
            useValue: coordinateFormatterServiceMock,
          },
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(MousePositionComponent)
    component = fixture.componentInstance
    component.map = mapMock
    component.formatByProjection = formatByProjectionMock
    fixture.detectChanges()
  })

  it('creates', () => {
    expect(component).toBeTruthy()
  })

  describe('predefined format depending on projection', () => {
    describe('projection not found in map', () => {
      it('gets the default format', () => {
        expect(component.getformatForProjection('EPSG:3857')).toBe(
          'numberCoordinates:2:{x} {y}'
        )
      })
    })

    describe('projection found in map', () => {
      it('gets the format defined for the projection', () => {
        expect(component.getformatForProjection('EPSG:4326')).toBe(
          'dmsCoordinates:5:{x} - {y}'
        )
      })
    })
  })
})
