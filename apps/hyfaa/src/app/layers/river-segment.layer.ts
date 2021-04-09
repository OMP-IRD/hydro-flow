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
import SETTINGS from '../../settings'
import { MapManagerService } from '../map/map-manager.service'
import { RIVER_SEGMENT_STYLE_GS } from './river-segment.style'

const olParser = new OpenlayersParser()

@Injectable({
  providedIn: 'root',
})
export class RiverSegmentLayer {
  private layer: VectorTileLayer
  private source: VectorTileSource
  public selectPointerMove: Select
  rootStyleFn: (feature, resolution) => undefined

  constructor(private mapManager: MapManagerService) {
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

    fromPromise(olParser.writeStyle(RIVER_SEGMENT_STYLE_GS)).subscribe(
      (style) => (this.rootStyleFn = style)
    )
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
      // if (feature.getId() === hlFeature.getId()) {
      if (
        feature.get('flow_median_yearly_average') ===
        hlFeature.get('flow_median_yearly_average')
      ) {
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
