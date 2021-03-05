import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FORMAT_BY_PROJECTION } from '@hydro-flow/ui/map'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'

@Component({
  selector: 'hyfaa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  map: Map
  mousePositionProj = 'EPSG:4326'
  formatByProjection = FORMAT_BY_PROJECTION

  ngOnInit(): void {
    this.map = new Map({
      controls: [],
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    })
  }
}
