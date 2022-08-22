import { ChangeDetectionStrategy, Component } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { HyfaaSegmentFocus } from '@hydro-flow/feature/hydro'
import { LegendSpec } from '@hydro-flow/ui/map'
import { SaguiFacade } from '../../+state/sagui.facade'
import { BASSIN_RULES } from '../../layers/bassin.rules'
import { RiverSegmentLayer } from '../../layers/river-segment.layer'
import { STATION_COLOR, StationLayer } from '../../layers/station.layer'

marker('sagui.legend.stations')
marker('common.legend.locationofinterest')
marker('sagui.legend.bassin')

@Component({
  selector: 'hyfaa-legend-container',
  templateUrl: './legend-container.component.html',
  styleUrls: ['./legend-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegendContainerComponent {
  stationLegend: LegendSpec = {
    title: 'sagui.legend.stations',
    rules: [
      {
        label: 'common.legend.locationofinterest',
        color: STATION_COLOR,
      },
    ],
  }
  bassinLegendSpec: LegendSpec = {
    title: 'sagui.legend.bassin',
    rules: BASSIN_RULES,
  }

  get mvtVisibility(): boolean {
    return this.riverLayer.getLayer().getVisible()
  }
  get stationVisibility(): boolean {
    return this.stationLayer.getLayer().getVisible()
  }

  constructor(
    private riverLayer: RiverSegmentLayer,
    private stationLayer: StationLayer,
    public facade: SaguiFacade
  ) {}

  onStationVisibilityToggle(visible: boolean): void {
    this.stationLayer.getLayer().setVisible(visible)
  }

  onMvtVisibilityToggle(visible: boolean): void {
    this.riverLayer.getLayer().setVisible(visible)
  }

  onFocusChange(focus: HyfaaSegmentFocus): void {
    this.facade.setSegmentFocus(focus)
  }

  isRiver(tab) {
    return tab === 'flow_previ' || tab === 'flow_alerts'
  }
  isBassin(tab) {
    return tab === 'rain_alerts'
  }
  isAtmo(tab) {
    return tab === 'atmo_alerts'
  }
}
