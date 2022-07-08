import { Injectable } from '@angular/core'
import { LayerFactoryService } from '@hydro-flow/feature/map'
import Feature from 'ol/Feature'
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
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [1430901.1695, 621280.1659],
        multiWorld: true,
        constrainResolution: true,
        zoom: 6,
      }),
      pixelRatio: 1,
    })
  }

  getDatesFromMVT(cells: Feature): Date[] {
    const rcData = JSON.parse(cells.get('rc_data'))
    return rcData
      .reduce((dates, day) => {
        const dayDates = day.v.map(
          (dayValue) =>
            new Date(
              +day.d.substring(0, 4),
              +day.d.substring(4, 6) - 1,
              +day.d.substring(6, 8),
              +dayValue.t.substring(0, 2),
              +dayValue.t.substring(2, 4)
            )
        )
        const datesTZ = dayDates.map(
          (date) =>
            new Date(
              date.getTime() + Math.abs(date.getTimezoneOffset() * 60000)
            )
        )
        return [...dates, ...dayDates]
      }, [])
      .reverse()
  }
}
