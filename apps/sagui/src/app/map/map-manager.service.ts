import { Injectable } from '@angular/core'
import { LayerFactoryService } from '@hydro-flow/feature/map'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Feature from 'ol/Feature'

@Injectable({
  providedIn: 'root',
})
export class MapManagerService {
  map: Map
  private hlSegment: Feature

  constructor(private layerFactory: LayerFactoryService) {
    this.map = new Map({
      controls: [],
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [-6143300.331761774, 413500.74843450135],
        multiWorld: true,
        constrainResolution: true,
        zoom: 7,
      }),
      pixelRatio: 1,
    })
  }

  setHLSegment(segment: Feature): void {
    this.hlSegment = segment
  }

  getHLSegment(): Feature {
    return this.hlSegment
  }

  getDatesFromSegment(segment: Feature): string[] {
    return JSON.parse(segment.get('values'))
      .map((value) => value.date)
      .reverse()
  }
}
