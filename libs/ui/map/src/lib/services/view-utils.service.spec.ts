import { TestBed } from '@angular/core/testing'

import { ViewUtilsService } from './view-utils.service'

describe('ViewUtilsService', () => {
  let service: ViewUtilsService
  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ViewUtilsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#getResolutionFromScaleDenominator', () => {
    it('returns the correct resolution based on a DPI of 96', () => {
      expect(service.getResolutionFromScaleDenominator(1000)).toBeCloseTo(
        0.26458319045841,
        9
      )
      expect(service.getResolutionFromScaleDenominator(20000)).toBeCloseTo(
        5.29166380916821,
        9
      )
      expect(service.getResolutionFromScaleDenominator(50000)).toBeCloseTo(
        13.2291595229205,
        9
      )
      expect(service.getResolutionFromScaleDenominator(100000)).toBeCloseTo(
        26.4583190458411,
        9
      )
      expect(service.getResolutionFromScaleDenominator(456789)).toBeCloseTo(
        120.858690986307,
        9
      )
    })
  })

  describe('#getScaleDenominatorFromResolution', () => {
    it('returns the correct scale denominator based on a DPI of 96', () => {
      expect(
        service.getScaleDenominatorFromResolution(0.26458319045841)
      ).toBeCloseTo(1000, 9)
      expect(
        service.getScaleDenominatorFromResolution(5.29166380916821)
      ).toBeCloseTo(20000, 9)
      expect(
        service.getScaleDenominatorFromResolution(13.2291595229205)
      ).toBeCloseTo(50000, 9)
      expect(
        service.getScaleDenominatorFromResolution(26.4583190458411)
      ).toBeCloseTo(100000, 9)
      expect(
        service.getScaleDenominatorFromResolution(120.858690986307)
      ).toBeCloseTo(456789, 9)
    })
  })

  describe('#getResolutionFromZoom', () => {
    it('returns the correct resolution based on EPSG:3857', () => {
      expect(service.getResolutionFromZoom(0)).toBeCloseTo(
        156543.03392804097,
        9
      )
      expect(service.getResolutionFromZoom(2)).toBeCloseTo(39135.7584820102, 9)
      expect(service.getResolutionFromZoom(5.2)).toBeCloseTo(
        4258.70707394189,
        9
      )
      expect(service.getResolutionFromZoom(8)).toBeCloseTo(611.49622628141, 9)
      expect(service.getResolutionFromZoom(-1)).toBeCloseTo(313086.067856082, 9)
    })
  })
})
