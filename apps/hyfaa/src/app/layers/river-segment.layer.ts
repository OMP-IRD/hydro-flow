import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { HyfaaSegmentFocus } from '@hydro-flow/feature/hydro'
import { matchFilter } from '@hydro-flow/feature/map'
import OpenlayersParser from 'geostyler-openlayers-parser'
import QGISParser from 'geostyler-qgis-parser'
import { LineSymbolizer, Style as GSStyle } from 'geostyler-style'
import { VectorTile } from 'ol'
import { Extent } from 'ol/extent'
import Feature from 'ol/Feature'
import MVT from 'ol/format/MVT'
import VectorTileLayer from 'ol/layer/VectorTile'
import { unByKey } from 'ol/Observable'
import VectorTileSource from 'ol/source/VectorTile'
import { Stroke, Style } from 'ol/style'
import { fromPromise } from 'rxjs/internal-compatibility'
import { filter, map, mergeMap } from 'rxjs/operators'
import { HyfaaFacade } from '../+state/hyfaa.facade'
import SETTINGS from '../../settings'
import { MapManagerService } from '../map/map-manager.service'
import { formatDate } from '../utils'
import {
  RIVER_SEGMENT_STYLE_GS_COLOR,
  RIVER_SEGMENT_STYLE_GS_WIDTH,
} from './river-segment.style'

const olParser = new OpenlayersParser()
const qgisParser = new QGISParser()

export const HL_STYLE = new Style({
  stroke: new Stroke({
    color: '#53f6f7',
    width: 2,
  }),
})

@Injectable({
  providedIn: 'root',
})
export class RiverSegmentLayer {
  private layer: VectorTileLayer
  private source: VectorTileSource
  colorStyleFn: (feature, resolution) => undefined
  widthStyleFn: (feature, resolution) => undefined
  currentDate: string
  segmentFocus: HyfaaSegmentFocus

  constructor(
    private http: HttpClient,
    private mapManager: MapManagerService,
    private facade: HyfaaFacade
  ) {
    this.source = new VectorTileSource({
      format: new MVT({
        featureClass: Feature,
      }),
      url: SETTINGS.riverMVTUrl,
      maxZoom: 14,
      wrapX: false,
    })

    this.layer = new VectorTileLayer({
      source: this.source,
      className: 'river-layer',
      style: this.styleFn.bind(this),
    })

    // store dates from MVT in state.dates
    const subKey = this.source.on('tileloadend', (event) => {
      const tile = event.tile as VectorTile
      const feature = tile.getFeatures()[0] as Feature
      if (feature) {
        const dates = this.mapManager.getDatesFromSegment(feature)
        facade.setDates(dates)
        facade.setCurrentDate(dates[dates.length - 1])
        unByKey(subKey)
      }
    })

    this.source.on('tileloadend', (event) => {
      const tile = event.tile as VectorTile
      tile
        .getFeatures()
        .forEach((feature: Feature) =>
          feature.set('values', JSON.parse(feature.get('values')))
        )
    })
    this.parseQgisStyle('style_anomalie_viridis')

    /*
// Load styles function from Geostyler QML
    fromPromise(olParser.writeStyle(RIVER_SEGMENT_STYLE_GS_COLOR)).subscribe(
      (style) => (this.colorStyleFn = style)
    )
    fromPromise(olParser.writeStyle(RIVER_SEGMENT_STYLE_GS_WIDTH)).subscribe(
      (style) => (this.widthStyleFn = style)
    )
*/

    this.facade.currentDate$
      .pipe(
        filter((date) => !!date),
        map((date: Date) => formatDate(date))
      )
      .subscribe((date) => {
        this.currentDate = date
        this.layer.changed()
      })

    this.facade.segmentFocus$.pipe().subscribe((focus) => {
      this.segmentFocus = focus
      this.layer.changed()
    })

    // this.parseQgisStyle('style_debit_jetcustom')
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

  private styleFn(feature: Feature, resolution: number): Style | Style[] {
    let styleWidth = 1
    let styleColor = '#013CFF'

    let { rules } = RIVER_SEGMENT_STYLE_GS_WIDTH
    const width = feature.get('width')
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i]
      const { filter } = rule
      if (matchFilter(width, filter)) {
        styleWidth = (rule.symbolizers[0] as LineSymbolizer).width
        break
      }
    }

    rules = RIVER_SEGMENT_STYLE_GS_COLOR[this.segmentFocus].rules
    let focus = feature
      .get('values')
      .find((value) => value.date === this.currentDate)[this.segmentFocus]

    if (focus === null && this.segmentFocus === 'flow_anomaly') {
      focus = -Infinity
    }
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i]
      const { filter } = rule
      if (matchFilter(focus, filter)) {
        styleColor = (rule.symbolizers[0] as LineSymbolizer).color
        break
      }
    }

    const style = new Style({
      stroke: new Stroke({
        color: styleColor,
        width: styleWidth,
      }),
    })

    const hlFeature = this.mapManager.getHLSegment()
    if (hlFeature) {
      if (feature.get('cell_id') === hlFeature.get('cell_id')) {
        HL_STYLE.getStroke().setWidth(
          Math.max(style.getStroke().getWidth() * 3, 8)
        )
        return [HL_STYLE, style]
      }
    }
    return style
  }

  private parseQgisStyle(filename: string) {
    const options = {
      responseType: 'text' as const,
    }
    this.http
      .get(`assets/${filename}.qml`, options)
      .pipe(mergeMap((response) => fromPromise(qgisParser.readStyle(response))))

      .subscribe((style: GSStyle) => console.log(this.fixQgisStyle(style)))
  }

  private fixQgisStyle(style: GSStyle): GSStyle {
    style.rules.forEach((rule) =>
      rule.filter.forEach((filter, index) => {
        if (index > 0) {
          filter[1] = filter[1].toLowerCase()
          filter[2] = parseFloat(filter[2])
        }
      })
    )
    return style
  }
}
