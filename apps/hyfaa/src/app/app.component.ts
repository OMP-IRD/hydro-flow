import { HttpClient } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FORMAT_BY_PROJECTION } from '@hydro-flow/ui/map'
import { fromPromise } from 'rxjs/internal-compatibility'
import { mergeMap } from 'rxjs/operators'
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

  constructor(public mapManager: MapManagerService, private http: HttpClient) {}
  ngOnInit(): void {}
}
