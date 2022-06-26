import { Injectable } from '@angular/core'
import { LayerFactoryService } from '@hydro-flow/feature/map'
import TileLayer from 'ol/layer/Tile'
import Map from 'ol/Map'
import OSM from 'ol/source/OSM'
import View from 'ol/View'

@Injectable({
  providedIn: 'root',
})
export class MapManagerService {
  map: Map

  constructor(private layerFactory: LayerFactoryService) {
    this.map = new Map({
      controls: [],
      // layers: [this.layerFactory.create(SETTINGS.backgroundLayers[0])],
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
      pixelRatio: 1,
    })
  }
}
