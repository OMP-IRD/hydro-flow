import { Injectable } from '@angular/core'
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

  constructor() {
    this.map = new Map({
      controls: [],
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [252017.62097741175, 1212528.606331404],
        multiWorld: true,
        constrainResolution: true,
        zoom: 6,
      }),
    })
  }

  setHLSegment(segment: Feature): void {
    this.hlSegment = segment
  }

  getHLSegment(): Feature {
    return this.hlSegment
  }
}
