import { Injectable } from '@angular/core'
import { Extent } from 'ol/extent'
import Feature from 'ol/Feature'
import MVT from 'ol/format/MVT'
import VectorTileLayer from 'ol/layer/VectorTile'
import Map from 'ol/Map'
import VectorTileSource from 'ol/source/VectorTile'

import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'
import SETTINGS from '../../settings'
import { MapManagerService } from '../map/map-manager.service'
import { setRgbOpacity } from '../utils'

export const STATION_COLOR = 'rgb(222, 43, 178)'
@Injectable({
  providedIn: 'root',
})
export class StationLayer {
  map: Map
  private layer: VectorTileLayer
  private source: VectorTileSource

  constructor(private mapManager: MapManagerService) {
    this.map = this.mapManager.map

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

    this.initInteractions_()
  }

  private initInteractions_(): void {
    this.map.on('pointermove', (event) => {
      const hovering = this.map.forEachLayerAtPixel(
        event.pixel,
        (layer) => layer === this.getLayer()
      )
      if (hovering) {
        this.map.getTarget().style.cursor = 'pointer'
      } else {
        this.map.getTarget().style.cursor = ''
      }
    })
    this.map.on('click', (event) => {
      const hit = this.map.forEachFeatureAtPixel(
        event.pixel,
        (feature: Feature) => {
          return feature
        },
        { layerFilter: (layer) => layer === this.getLayer() }
      )
      if (hit) {
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

  private styleFn(feature: Feature, resolution: number): Style {
    const color = STATION_COLOR
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
    })
  }
}
