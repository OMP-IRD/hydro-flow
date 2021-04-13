import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { matchFilter } from '@hydro-flow/feature/map'
import OpenlayersParser from 'geostyler-openlayers-parser'
import QGISParser from 'geostyler-qgis-parser'
import { Style as GSStyle, LineSymbolizer } from 'geostyler-style'
import { Extent } from 'ol/extent'
import Feature from 'ol/Feature'
import MVT from 'ol/format/MVT'
import VectorTileLayer from 'ol/layer/VectorTile'
import { unByKey } from 'ol/Observable'
import VectorTileSource from 'ol/source/VectorTile'
import { Style, Stroke } from 'ol/style'
import { fromPromise } from 'rxjs/internal-compatibility'
import { filter, map, mergeMap } from 'rxjs/operators'
import { HyfaaFacade } from '../+state/hyfaa.facade'
import SETTINGS from '../../settings'
import { MapManagerService } from '../map/map-manager.service'
import {
  RIVER_SEGMENT_STYLE_GS_COLOR,
  RIVER_SEGMENT_STYLE_GS_JET,
  RIVER_SEGMENT_STYLE_GS_WIDTH,
} from './river-segment.style'

const olParser = new OpenlayersParser()
const qgisParser = new QGISParser()

@Injectable({
  providedIn: 'root',
})
export class RiverSegmentLayer {
  private layer: VectorTileLayer
  private source: VectorTileSource
  colorStyleFn: (feature, resolution) => undefined
  widthStyleFn: (feature, resolution) => undefined
  currentDate: string

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
      style: this.styleFn.bind(this),
    })

    // store dates from MVT in state.dates
    const subKey = this.source.on('tileloadend', (event) => {
      const tile = event.tile
      const feature = tile.getFeatures()[0]
      if (feature) {
        const dates = this.mapManager.getDatesFromSegment(feature)
        facade.setDates(dates)
        facade.setCurrentDate(dates[dates.length - 1])
        unByKey(subKey)
      }
    })

    this.source.on('tileloadend', (event) => {
      const tile = event.tile
      tile
        .getFeatures()
        .forEach((feature) =>
          feature.set('values', JSON.parse(feature.get('values')))
        )
    })

    fromPromise(olParser.writeStyle(RIVER_SEGMENT_STYLE_GS_COLOR)).subscribe(
      (style) => (this.colorStyleFn = style)
    )
    fromPromise(olParser.writeStyle(RIVER_SEGMENT_STYLE_GS_WIDTH)).subscribe(
      (style) => (this.widthStyleFn = style)
    )

    this.facade.currentDate$
      .pipe(
        filter((date) => !!date),
        map((date: Date) => this.formatDate(date))
      )
      .subscribe((date) => {
        this.currentDate = date
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

  private styleFn(feature: Feature, resolution: number): Style {
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

    rules = RIVER_SEGMENT_STYLE_GS_COLOR.rules
    const flow = feature
      .get('values')
      .find((value) => value.date === this.currentDate).flow_median
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i]
      const { filter } = rule
      if (matchFilter(flow, filter)) {
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
    return style

    const colorStyleFnOutput = this.colorStyleFn(feature, resolution)
    const widthStyleFnOutput = this.widthStyleFn(feature, resolution)
    const hlFeature = this.mapManager.getHLSegment()

    if (!colorStyleFnOutput && !widthStyleFnOutput) {
      return
    }
    // @ts-ignore
    const widthStyle = widthStyleFnOutput[0]
    // @ts-ignore
    const colorStyle = colorStyleFnOutput[0]

    widthStyle.getStroke().setColor(colorStyle.getStroke().getColor())
    // @ts-ignore
    if (hlFeature) {
      if (feature.get('cell_id') === hlFeature.get('cell_id')) {
        widthStyle.getStroke().setColor('red')
      }
    }
    return widthStyle
    /*
    const width = feature.get('width')
    let color = width > 60 ? 'blue' : 'green'
    if (feature.get('_hover')) {
      color = 'red'
    }
    style.getStroke().setColor(color)
    style.getStroke().setWidth(width / resolution)
    return style
*/
  }

  private formatDate(date: Date): string {
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
      '0' + date.getDate()
    ).slice(-2)}`
  }

  private parseQgisStyle(filename: string) {
    const options = {
      responseType: 'text' as 'text',
    }
    this.http
      .get(`assets/${filename}.qml`, options)
      .pipe(mergeMap((response) => fromPromise(qgisParser.readStyle(response))))

      .subscribe((style) => console.log(this.fixQgisStyle(style)))
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
