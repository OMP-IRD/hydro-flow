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
        center: [-5965966.42614017, 413500.74843450135],
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

  getDatesFromSegment(segment: Feature): Date[] {
    const values = JSON.parse(segment.get('values'))
    return values
      .reduce((dates, value) => {
        const date = new Date(value.date)
        return [
          ...dates,
          new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000)),
        ]
      }, [])
      .reverse()
  }
}
