import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FORMAT_BY_PROJECTION } from '@hydro-flow/ui/map'
import { MapManagerService } from './map/map-manager.service'

@Component({
  selector: 'hyfaa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  mousePositionProj = 'EPSG:4326'
  formatByProjection = FORMAT_BY_PROJECTION

  constructor(public mapManager: MapManagerService) {}
  ngOnInit(): void {}
}
