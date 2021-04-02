import { Injectable } from '@angular/core'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'

@Injectable({
  providedIn: 'root',
})
export class MapManagerService {
  map: Map

  constructor() {
    this.map = new Map({
      controls: [],
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [1190239.4936596497, 2422899.318825233],
        multiWorld: true,
        constrainResolution: true,
        zoom: 5,
      }),
    })
  }
}
