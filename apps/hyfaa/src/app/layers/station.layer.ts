import { Injectable } from '@angular/core'
import { Extent } from 'ol/extent'
import Feature from 'ol/Feature'
import MVT from 'ol/format/MVT'
import VectorTileLayer from 'ol/layer/VectorTile'
import VectorTileSource from 'ol/source/VectorTile'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'
import SETTINGS from '../../settings'
import { MapManagerService } from '../map/map-manager.service'
import { setRgbOpacity } from '../utils'

@Injectable({
  providedIn: 'root',
})
export class StationLayer {
  private layer: VectorTileLayer
  private source: VectorTileSource

  constructor(private mapManager: MapManagerService) {
    this.source = new VectorTileSource({
      format: new MVT({
        featureClass: Feature,
      }),
      url: SETTINGS.stationMVTUrl,
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
    const color = 'rgb(222, 43, 178)'
    const radius = 8
    const width = radius - 2
    return new Style({
      image: new CircleStyle({
        radius,
        fill: new Fill({ color }),
        stroke: new Stroke({
          width,
          color: setRgbOpacity(color, 0.5),
        }),
      }),
      /*
      text: new Text({
        text: size.toString(),
        scale: 1.8,
        fill: new Fill({
          color: '#fff',
        }),
      }),
*/
    })
  }
}
