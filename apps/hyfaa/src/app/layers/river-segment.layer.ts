import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import OpenlayersParser from 'geostyler-openlayers-parser'
import { Style as GSStyle } from 'geostyler-style'
import { pointerMove } from 'ol/events/condition'
import { Extent } from 'ol/extent'
import Feature from 'ol/Feature'
import MVT from 'ol/format/MVT'
import Select from 'ol/interaction/Select'
import VectorTileLayer from 'ol/layer/VectorTile'
import VectorTileSource from 'ol/source/VectorTile'
import { Stroke, Style } from 'ol/style'
import { fromPromise } from 'rxjs/internal-compatibility'
import { mergeMap } from 'rxjs/operators'
import { HyfaaFacade } from '../+state/hyfaa.facade'
import SETTINGS from '../../settings'
import { MapManagerService } from '../map/map-manager.service'
import {
  RIVER_SEGMENT_STYLE_GS,
  RIVER_SEGMENT_STYLE_GS_JET,
  RIVER_SEGMENT_STYLE_GS_VIRIDIS,
} from './river-segment.style'
import { unByKey } from 'ol/Observable'
import QGISParser from 'geostyler-qgis-parser'

const olParser = new OpenlayersParser()
const qgisParser = new QGISParser()

@Injectable({
  providedIn: 'root',
})
export class RiverSegmentLayer {
  private layer: VectorTileLayer
  private source: VectorTileSource
  public selectPointerMove: Select
  rootStyleFn: (feature, resolution) => undefined

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

    fromPromise(olParser.writeStyle(RIVER_SEGMENT_STYLE_GS_JET)).subscribe(
      (style) => (this.rootStyleFn = style)
    )

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
    const rootStyleFnOutput = this.rootStyleFn(feature, resolution)
    const hlFeature = this.mapManager.getHLSegment()

    if (!rootStyleFnOutput) {
      return
    }
    // @ts-ignore
    const rootStyle = rootStyleFnOutput[0]
    if (hlFeature) {
      if (feature.get('cell_id') === hlFeature.get('cell_id')) {
        rootStyle.getStroke().setColor('red')
      }
    }
    return rootStyle
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
