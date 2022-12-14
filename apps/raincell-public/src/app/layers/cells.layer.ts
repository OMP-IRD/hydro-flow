import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { CellsFacade } from '@hydro-flow/feature/hydro'
import { matchFilter } from '@hydro-flow/feature/map'
import { addOpacity } from '@hydro-flow/feature/shared'
import { DateFacade, dateToHHmm, dateToyyyMMdd } from '@hydro-flow/feature/time'
import { VectorTile } from 'ol'
import { Extent } from 'ol/extent'
import Feature from 'ol/Feature'
import MVT from 'ol/format/MVT'
import VectorTileLayer from 'ol/layer/VectorTile'
import { unByKey } from 'ol/Observable'
import VectorTileSource from 'ol/source/VectorTile'
import { Fill, Stroke, Style } from 'ol/style'
import { filter } from 'rxjs/operators'
import { RaincellFacade } from '../+state/raincell.facade'
import { MapManagerService } from '../map/map-manager.service'
import SETTINGS from '../settings'
import { CELLS_RULES } from './cells.rules'
import { CellDate } from './cells.style'

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
  cellDate: CellDate = { time: undefined, date: undefined }
  cellHL: Feature

  constructor(
    private http: HttpClient,
    private mapManager: MapManagerService,
    private dateFacade: DateFacade,
    private cellsFacade: CellsFacade,
    private raincellFacade: RaincellFacade
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
      style: this.styleFn.bind(this),
    })

    this.raincellFacade.date$.subscribe((date) => {
      this.source.setUrl(
        `${SETTINGS.camerounMVTUrl}?ref_time=${date.toISOString()}`
      )
      const subKey = this.source.on('tileloadend', (event) => {
        const tile = event.tile as VectorTile
        const feature = tile.getFeatures()[0] as Feature
        if (feature) {
          const dates = this.mapManager.getDatesFromMVT(feature)
          dateFacade.setDates(dates)
          dateFacade.setCurrentDate(dates[0])
          unByKey(subKey)
        }
      })
      this.source.refresh()
    })

    this.dateFacade.currentDate$
      .pipe(filter((date) => !!date))
      .subscribe((date) => {
        this.cellDate.date = dateToyyyMMdd(date)
        this.cellDate.time = dateToHHmm(date)
        this.layer.changed()
      })

    const map = this.mapManager.map
    map.on('pointermove', (event) => {
      const target = map.getTarget() as HTMLElement
      const hovering = this.getHit(event.pixel)
      if (hovering) {
        target.style.cursor = 'pointer'
        this.cellHL = hovering
        this.layer.changed()
      } else {
        target.style.cursor = ''
        this.cellHL = null
        this.layer.changed()
      }
    })
    map.on('click', (event) => {
      const hit = this.getHit(event.pixel)
      if (hit) {
        const id = hit.get('cell_id')
        this.cellsFacade.load(id)
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

  private getHit(pixel: number[]) {
    return this.mapManager.map.forEachFeatureAtPixel(
      pixel,
      (feature: Feature) => {
        return feature
      },
      { layerFilter: (layer) => layer === this.getLayer() }
    )
  }

  private styleFn(feature: Feature, resolution: number): Style | Style[] {
    const value = JSON.parse(feature.get('rc_data'))
      .find((days) => days.d === this.cellDate.date)
      .v.find((hours) => hours.t === this.cellDate.time).v

    let color
    for (let i = 0; i < CELLS_RULES.length; i++) {
      const rule = CELLS_RULES[i]
      const { filter } = rule
      if (matchFilter(value, filter)) {
        color = rule.color
        break
      }
    }
    const style = new Style({
      stroke: new Stroke({
        color,
        width: 1,
      }),
      fill: new Fill({
        color: addOpacity(color, 0.2),
      }),
    })
    if (feature === this.cellHL) {
      style.getStroke().setWidth(3)
    }
    return style
  }
}
