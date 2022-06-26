import { Component } from '@angular/core'
import { FORMAT_BY_PROJECTION } from '@hydro-flow/ui/map'
import { MapManagerService } from './map/map-manager.service'

@Component({
  selector: 'raincell-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  mousePositionProj = 'EPSG:4326'
  formatByProjection = FORMAT_BY_PROJECTION

  constructor(public mapManager: MapManagerService) {}
}
