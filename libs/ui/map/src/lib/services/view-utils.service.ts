import { Injectable } from '@angular/core';

/**
 * https://openlayers.org/en/latest/apidoc/module-ol_View.html
 * If unspecified it is calculated assuming 29 zoom levels (with a factor of 2).
 * If the projection is Spherical Mercator (the default) then minResolution defaults to
 * 40075016.68557849 / 256 / Math.pow(2, 28) = 0.0005831682455839253
 */
export const DEFAULT_MIN_RESOLUTION = 0.0005831682455839253;

/**
 *
 * https://openlayers.org/en/latest/apidoc/module-ol_View.html
 * If unspecified it is calculated in such a way that the projection's validity extent fits in a 256x256 px tile.
 * If the projection is Spherical Mercator (the default) then maxResolution defaults to
 * 40075016.68557849 / 256 = 156543.03392804097
 */
export const DEFAULT_MAX_RESOLUTION = 156543.03392804097;

/** The DPI is an arbitrary value, in the end it all depends on the physical device of the user */
const DEFAULT_DPI = 96;

const INCH_PER_METER = 39.3701;

@Injectable({
  providedIn: 'root',
})
export class ViewUtilsService {
  constructor() {}

  getResolutionFromScaleDenominator(scale: number) {
    return scale / DEFAULT_DPI / INCH_PER_METER;
  }

  getScaleDenominatorFromResolution(resolution: number) {
    return resolution * DEFAULT_DPI * INCH_PER_METER;
  }

  getResolutionFromZoom(zoom: number) {
    return DEFAULT_MAX_RESOLUTION / Math.pow(2, zoom);
  }
}
