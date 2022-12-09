import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { HyfaaSegmentFocus } from '@hydro-flow/feature/hydro'
import { matchFilter } from '@hydro-flow/feature/map'
import { addOpacity } from '@hydro-flow/feature/shared'
import { DateFacade } from '@hydro-flow/feature/time'
import { LineSymbolizer } from 'geostyler-style'
import { VectorTile } from 'ol'
import { Extent } from 'ol/extent'
import Feature from 'ol/Feature'
import MVT from 'ol/format/MVT'
import VectorTileLayer from 'ol/layer/VectorTile'
import { unByKey } from 'ol/Observable'
import VectorTileSource from 'ol/source/VectorTile'
import { Fill, Stroke, Style } from 'ol/style'
import { Subscription } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { SaguiFacade } from '../+state/sagui.facade'
import SETTINGS from '../../settings'
import { MapManagerService } from '../map/map-manager.service'
import { formatDate } from '../utils'
import { BASSIN_RULES } from './bassin.rules'
import {
  RIVER_SEGMENT_STYLE_GS_COLOR,
  RIVER_SEGMENT_STYLE_GS_WIDTH,
} from './river-segment.style'

export const HL_STYLE = new Style({
  stroke: new Stroke({
    color: '#53f6f7',
    width: 2,
  }),
  zIndex: 10,
})

export const bassinStyleCache = {}

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
  tmpSubscription: Subscription

  constructor(
    private http: HttpClient,
    private mapManager: MapManagerService,
    private facade: SaguiFacade,
    private dateFacade: DateFacade
  ) {
    this.dateFacade.currentDate$
      .pipe(
        filter((date) => !!date)
        // map((date: Date) => formatDate(date))
      )
      .subscribe((date) => {
        this.currentDate = date
        this.layer.changed()
      })

    this.facade.tab$.subscribe((tab) => {
      const tabSetting = SETTINGS.tabs[tab]
      if (tabSetting && tabSetting.hasOwnProperty('riverLayer')) {
        this.loadSource(tabSetting.riverLayer)
        this.layer.setStyle(this.styleFn.bind(this))
      } else if (tabSetting && tabSetting.hasOwnProperty('bassinLayer')) {
        this.loadSource(tabSetting.bassinLayer)
        this.layer.setStyle(this.bassinStyleFn.bind(this))
      }
    })
  }

  loadSource(layerName: string) {
    if (this.tmpSubscription) {
      this.tmpSubscription.unsubscribe()
    }
    this.tmpSubscription = new Subscription()
    this.mapManager.map.removeLayer(this.layer)
    this.source = new VectorTileSource({
      format: new MVT({
        featureClass: Feature,
      }),
      url: `/tiles/${layerName}/{z}/{x}/{y}.pbf`,
      maxZoom: 14,
      wrapX: false,
    })

    this.layer = new VectorTileLayer({
      source: this.source,
      className: 'river-layer',
    })

    this.tmpSubscription.add(
      this.facade.segmentFocus$.subscribe((focus) => {
        this.segmentFocus = focus
        this.layer.changed()
      })
    )

    // store dates from MVT in state.dates
    const subKey = this.source.on('tileloadend', (event) => {
      const tile = event.tile as VectorTile
      const feature = tile.getFeatures()[0] as Feature
      if (feature) {
        const dates = this.mapManager.getDatesFromSegment(feature)
        this.dateFacade.setDates(dates)
        this.dateFacade.setCurrentDate(dates[dates.length - 1])
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
    this.mapManager.map.addLayer(this.layer)
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

  private bassinStyleFn(feature: Feature): Style | Style[] {
    const rain = feature
      .get('values')
      .find((value) => value.date === this.currentDate)?.rain
    let color
    for (let i = 0; i < BASSIN_RULES.length; i++) {
      const rule = BASSIN_RULES[i]
      const { filter } = rule
      if (matchFilter(rain, filter)) {
        color = rule.color
        break
      }
    }
    if (!bassinStyleCache[color]) {
      bassinStyleCache[color] = new Style({
        stroke: new Stroke({
          color: 'rgb(25,25,25)',
          width: 1,
        }),
        fill: new Fill({
          color: addOpacity(color, 0.8),
        }),
      })
    }
    const style = bassinStyleCache[color]
    const hlFeature = this.mapManager.getHLSegment()
    if (hlFeature) {
      if (feature.get('id') === hlFeature.get('id')) {
        HL_STYLE.getStroke().setWidth(
          Math.max(style.getStroke().getWidth() * 3, 8)
        )
        return [HL_STYLE, style]
      }
    }
    return style
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
}
