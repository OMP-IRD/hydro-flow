import { ChangeDetectionStrategy, Component } from '@angular/core'
import { HyfaaSegmentFocus } from '@hydro-flow/feature/hydro'
import { LegendSpec } from '@hydro-flow/ui/map'
import { SaguiFacade } from '../../+state/sagui.facade'
import { RiverSegmentLayer } from '../../layers/river-segment.layer'
import { STATION_COLOR, StationLayer } from '../../layers/station.layer'

@Component({
  selector: 'hyfaa-legend-container',
  templateUrl: './legend-container.component.html',
  styleUrls: ['./legend-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegendContainerComponent {
  stationLegend: LegendSpec = {
    title: 'Stations',
    rules: [
      {
        label: 'Locations of interest',
        color: STATION_COLOR,
      },
    ],
  }

  get segmentVisibility(): boolean {
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

  onSegmentVisibilityToggle(visible: boolean): void {
    this.riverLayer.getLayer().setVisible(visible)
  }

  onFocusChange(focus: HyfaaSegmentFocus): void {
    this.facade.setSegmentFocus(focus)
  }
}
