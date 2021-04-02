import { Injectable } from '@angular/core'
import { Extent } from 'ol/extent'
import Feature from 'ol/Feature'
import MVT from 'ol/format/MVT'
import VectorTileLayer from 'ol/layer/VectorTile'
import VectorTileSource from 'ol/source/VectorTile'
import { Stroke, Style } from 'ol/style'
import SETTINGS from '../../settings'

const style = new Style({
  stroke: new Stroke({
    color: 'black',
  }),
})

@Injectable({
  providedIn: 'root',
})
export class RiverSegmentLayer {
  private layer: VectorTileLayer
  private source: VectorTileSource

  constructor() {
    this.source = new VectorTileSource({
      format: new MVT(),
      url: SETTINGS.riverMVTUrl,
      maxZoom: 14,
      wrapX: false,
    })

    this.layer = new VectorTileLayer({
      source: this.source,
      style: this.styleFn.bind(this),
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

  private styleFn(feature: Feature, resolution: number): Style {
    const width = feature.get('width')
    const color = width > 60 ? 'blue' : 'green'
    style.getStroke().setColor(color)
    style.getStroke().setWidth(width / resolution)
    return style
  }
}
