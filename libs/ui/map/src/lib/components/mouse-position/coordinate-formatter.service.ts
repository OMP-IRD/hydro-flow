import { Injectable } from '@angular/core'
import { DecimalPipe } from '@angular/common'
import { modulo } from 'ol/math.js'

@Injectable({
  providedIn: 'root',
})
export class CoordinateFormatterService {
  constructor(private _decimalPipe: DecimalPipe) {}

  numberCoordinates(
    coordinates: number[],
    fractionDigitsStr?: string,
    template?: string
  ) {
    const fractionDigits = parseInt(fractionDigitsStr, 10) || 0
    template = template || '{x} {y}'

    const x = coordinates[0]
    const y = coordinates[1]
    const digitsInfo = `1.${fractionDigits}-${fractionDigits}`
    const sX = this._decimalPipe.transform(x, digitsInfo)
    const sY = this._decimalPipe.transform(y, digitsInfo)
    return template.replace('{x}', sX).replace('{y}', sY)
  }

  dmsCoordinates(
    coordinates: number[],
    fractionDigitsStr?: string,
    template?: string
  ) {
    const fractionDigits = parseInt(fractionDigitsStr, 10) || 0
    template = template || '{x} {y}'

    const xdms = this._degreesToStringHDMS(coordinates[0], 'EW', fractionDigits)
    const ydms = this._degreesToStringHDMS(coordinates[1], 'NS', fractionDigits)

    return template.replace('{x}', xdms).replace('{y}', ydms)
  }

  private _degreesToStringHDMS = function (
    degrees: number,
    hemispheres,
    fractionDigits
  ) {
    const normalizedDegrees = modulo(degrees + 180, 360) - 180
    const dms = Math.abs(3600 * normalizedDegrees)
    const d = Math.floor(dms / 3600)
    const m = Math.floor((dms / 60) % 60)
    const s = dms % 60
    return `${d}\u00b0 ${this._padNumber(m, 2)}\u2032 ${this._padNumber(
      s,
      2,
      fractionDigits
    )}\u2033 ${hemispheres.charAt(normalizedDegrees < 0 ? 1 : 0)}`
  }

  private _padNumber(number, width, opt_precision) {
    const numberString =
      opt_precision !== undefined ? number.toFixed(opt_precision) : '' + number
    let decimal = numberString.indexOf('.')
    decimal = decimal === -1 ? numberString.length : decimal
    return decimal > width
      ? numberString
      : new Array(1 + width - decimal).join('0') + numberString
  }
}
