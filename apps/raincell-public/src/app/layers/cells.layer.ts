import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { HyfaaSegmentFocus } from '@hydro-flow/feature/hydro'
import { DateFacade } from '@hydro-flow/feature/time'
import { VectorTile } from 'ol'
import { Extent } from 'ol/extent'
import Feature from 'ol/Feature'
import MVT from 'ol/format/MVT'
import VectorTileLayer from 'ol/layer/VectorTile'
import { unByKey } from 'ol/Observable'
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

  constructor(
    private http: HttpClient,
    private mapManager: MapManagerService,
    private dateFacade: DateFacade
  ) {
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

    const subKey = this.source.on('tileloadend', (event) => {
      const tile = event.tile as VectorTile
      const feature = tile.getFeatures()[0] as Feature
      if (feature) {
        const dates = this.mapManager.getDatesFromMVT(feature)
        dateFacade.setDates(dates)
        dateFacade.setCurrentDate(dates[dates.length - 1])
        unByKey(subKey)
      }
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
