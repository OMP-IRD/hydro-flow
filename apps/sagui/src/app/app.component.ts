import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FORMAT_BY_PROJECTION } from '@hydro-flow/ui/map'
import { SaguiFacade } from './+state/sagui.facade'
import { MapManagerService } from './map/map-manager.service'
import { SAGUI_TAB_TYPES } from './ui/ui.model'

@Component({
  selector: 'sagui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  mousePositionProj = 'EPSG:4326'
  formatByProjection = FORMAT_BY_PROJECTION

  constructor(
    public mapManager: MapManagerService,
    private facade: SaguiFacade
  ) {
    this.facade.setTab(SAGUI_TAB_TYPES[0])
  }
}
