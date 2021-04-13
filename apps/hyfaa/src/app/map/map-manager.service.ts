import { Injectable } from '@angular/core'
import { LayerFactoryService } from '@hydro-flow/feature/map'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Feature from 'ol/Feature'
import SETTINGS from '../../settings'

@Injectable({
  providedIn: 'root',
})
export class MapManagerService {
  map: Map
  private hlSegment: Feature

  constructor(private layerFactory: LayerFactoryService) {
    this.map = new Map({
      controls: [],
      layers: [this.layerFactory.create(SETTINGS.backgroundLayers[0])],
      /*
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
*/
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

  getDatesFromSegment(segment: Feature): Date[] {
    const values = JSON.parse(segment.get('values'))
    return values
      .reduce((dates, value) => {
        return [...dates, new Date(value.date)]
      }, [])
      .reverse()
  }
}
