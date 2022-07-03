import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { HyfaaSegmentFocus } from '@hydro-flow/feature/hydro'
import { Extent } from 'ol/extent'
import Feature from 'ol/Feature'
import MVT from 'ol/format/MVT'
import VectorTileLayer from 'ol/layer/VectorTile'
import VectorTileSource from 'ol/source/VectorTile'
import { Stroke, Style } from 'ol/style'
import { MapManagerService } from '../map/map-manager.service'
import SETTINGS from '../settings'

export const HL_STYLE = new Style({
  stroke: new Stroke({
    color: '#53f6f7',
    width: 2,
  }),
})

@Injectable({
  providedIn: 'root',
})
export class CellsLayer {
  private layer: VectorTileLayer
  private source: VectorTileSource
  colorStyleFn: (feature, resolution) => undefined
  widthStyleFn: (feature, resolution) => undefined
  currentDate: string
  segmentFocus: HyfaaSegmentFocus

  constructor(private http: HttpClient, private mapManager: MapManagerService) {
    this.source = new VectorTileSource({
      format: new MVT({
        featureClass: Feature,
      }),
      url: SETTINGS.camerounMVTUrl,
      maxZoom: 14,
      wrapX: false,
    })

    this.layer = new VectorTileLayer({
      source: this.source,
      className: 'cells-layer',
    })
  }

  public getLayer(): VectorTileLayer {
    return this.layer
  }

  public getExtent(): Extent {
    return this.layer.getExtent()
  }

  public clear(): void {
    this.source.clear()
  }
}
