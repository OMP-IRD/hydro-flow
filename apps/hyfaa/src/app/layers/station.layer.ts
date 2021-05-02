import { Injectable } from '@angular/core'
import { StationsFacade } from '@hydro-flow/feature/hydro'
import { Extent } from 'ol/extent'
import Feature from 'ol/Feature'
import VectorLayer from 'ol/layer/Vector'
import Map from 'ol/Map'
import VectorSource from 'ol/source/Vector'

import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'
import { skip } from 'rxjs/operators'
import { HyfaaFacade } from '../+state/hyfaa.facade'
import { MapManagerService } from '../map/map-manager.service'
import { setRgbOpacity } from '../utils'

export const STATION_COLOR = 'rgb(222, 43, 178)'
@Injectable({
  providedIn: 'root',
})
export class StationLayer {
  map: Map
  private layer: VectorLayer
  private source: VectorSource

  constructor(
    private mapManager: MapManagerService,
    private stationFacade: StationsFacade,
    private facade: HyfaaFacade
  ) {
    this.map = this.mapManager.map

    this.source = new VectorSource({
      maxZoom: 14,
      wrapX: false,
    })

    this.layer = new VectorLayer({
      source: this.source,
      className: 'station-layer',
      style: this.styleFn.bind(this),
    })

    this.stationFacade.init()
    this.stationFacade.allStations$
      .pipe(skip(1))
      .subscribe((stations) => this.source.addFeatures(stations))
    this.initInteractions_()
  }

  private initInteractions_(): void {
    this.map.on('pointermove', (event) => {
      const hovering = this.getHit(event.pixel)
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
        this.stationFacade.selectStation(hit.getId())
      }
    })
  }

  public getLayer(): VectorLayer {
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

  private getHit(pixel: number[]) {
    return this.map.forEachFeatureAtPixel(
      pixel,
      (feature: Feature) => {
        return feature
      },
      { layerFilter: (layer) => layer === this.getLayer() }
    )
  }
}
