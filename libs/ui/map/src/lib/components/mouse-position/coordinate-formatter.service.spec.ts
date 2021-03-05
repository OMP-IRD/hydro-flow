import { CoordinateFormatterService } from './coordinate-formatter.service'
import { DecimalPipe } from '@angular/common'
import { TestBed } from '@angular/core/testing'

describe('CoordinateFormatterService', () => {
  let coordinateFormatterService: CoordinateFormatterService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecimalPipe],
    })
    coordinateFormatterService = TestBed.inject(CoordinateFormatterService)
  })

  it('is created', () => {
    expect(coordinateFormatterService).toBeTruthy()
  })

  describe('numberCoordinates', () => {
    it('formats lon/lat coordinates', () => {
      const coords = [7.1234, 46.9876]
      expect(coordinateFormatterService.numberCoordinates(coords)).toBe('7 47')
      expect(
        coordinateFormatterService.numberCoordinates(
          coords,
          '2',
          'co {x} E; {y} N'
        )
      ).toBe('co 7.12 E; 46.99 N')
    })

    it('formats metric coordinates', () => {
      const coords = [2600000, 1600000]
      expect(
        coordinateFormatterService.numberCoordinates(coords, '0', '{x}, {y}')
      ).toBe('2,600,000, 1,600,000')
    })

    it('formats with correct number of digits', () => {
      const coords = [2600000, 1600000]
      expect(
        coordinateFormatterService.numberCoordinates(coords, '4', '{x}, {y}')
      ).toBe('2,600,000.0000, 1,600,000.0000')
    })

    it('formats with a template', () => {
      const coords = [2600000, 1600000]
      expect(
        coordinateFormatterService.numberCoordinates(coords, '0', '{x}, {y} m')
      ).toBe('2,600,000, 1,600,000 m')
    })
  })

  describe('dmsCoordinates', () => {
    it('formats lon/lat coordinates', () => {
      const coords = [7.1234, 46.9876]
      expect(coordinateFormatterService.dmsCoordinates(coords)).toBe(
        '7\u00b0 07\u2032 24\u2033 E 46\u00b0 59\u2032 15\u2033 N'
      )
      expect(
        coordinateFormatterService.dmsCoordinates(coords, '2', '[{y}; {x}]')
      ).toBe(
        '[46\u00b0 59\u2032 15.36\u2033 N; 7\u00b0 07\u2032 24.24\u2033 E]'
      )
    })
  })
})
