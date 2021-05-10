import { Component, OnInit } from '@angular/core'
import { geostylerToLegend } from '@hydro-flow/feature/map'
import { LegendSpec } from '@hydro-flow/ui/map'
import { take } from 'rxjs/operators'
import { HyfaaFacade } from '../../+state/hyfaa.facade'
import { RiverSegmentLayer } from '../../layers/river-segment.layer'
import { RIVER_SEGMENT_STYLE_GS_JET } from '../../layers/river-segment.style'
import { STATION_COLOR, StationLayer } from '../../layers/station.layer'
import { MapManagerService } from '../../map/map-manager.service'

@Component({
  selector: 'hyfaa-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss'],
})
export class MapContainerComponent implements OnInit {
  constructor(
    public mapManager: MapManagerService,
    private riverLayer: RiverSegmentLayer,
    private stationLayer: StationLayer,
    public facade: HyfaaFacade
  ) {}

  ngOnInit(): void {
    this.mapManager.map.addLayer(this.riverLayer.getLayer())
    this.mapManager.map.addLayer(this.stationLayer.getLayer())
  }

  onDateChange(date: Date): void {
    this.facade.setCurrentDate(date)
  }
  onAnimatorIndexChange(index: number): void {
    this.facade.dates$
      .pipe(take(1))
      .subscribe((dates) => this.facade.setCurrentDate(dates[index]))
  }
}
