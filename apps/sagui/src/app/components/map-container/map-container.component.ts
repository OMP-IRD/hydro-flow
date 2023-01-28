import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { SaguiFacade } from '../../+state/sagui.facade'
import SETTINGS from '../../../settings'
import { AtmoLayer } from '../../layers/atmo.layer'
import { RiverSegmentLayer } from '../../layers/river-segment.layer'
import { StationLayer } from '../../layers/station.layer'
import { MapManagerService } from '../../map/map-manager.service'
import { SaguiTab } from '../../ui/ui.model'

@Component({
  selector: 'sagui-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss'],
})
export class MapContainerComponent implements OnInit, OnDestroy {
  bgLayerConfig = SETTINGS.backgroundLayers
  subscription = new Subscription()

  constructor(
    public mapManager: MapManagerService,
    private riverLayer: RiverSegmentLayer,
    private atmoLayer: AtmoLayer,
    private stationLayer: StationLayer,
    private facade: SaguiFacade
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.subscription = this.facade.tab$.subscribe((tab) => {
      if (this.hasStationsOrBassins(tab)) {
        this.mapManager.map.removeLayer(this.atmoLayer.layer)
        if (!this.hasStationLayer()) {
          this.mapManager.map.addLayer(this.stationLayer.getLayer())
        }
        if (!this.hasRiverOrBassinLayer()) {
          this.mapManager.map.addLayer(this.riverLayer.getLayer())
        }
      } else {
        this.mapManager.map.removeLayer(this.stationLayer.getLayer())
        this.mapManager.map.removeLayer(this.riverLayer.getLayer())
        this.mapManager.map.addLayer(this.atmoLayer.layer)
      }
    })
    this.atmoLayer.initLayer()
  }

  private hasStationsOrBassins(tab: SaguiTab) {
    return (
      tab === 'flow_previ' || tab === 'flow_alerts' || tab === 'rain_alerts'
    )
  }

  private hasStationLayer() {
    return this.mapManager.map
      .getLayers()
      .getArray()
      .find((layer) => layer === this.stationLayer.getLayer())
  }

  private hasRiverOrBassinLayer() {
    return this.mapManager.map
      .getLayers()
      .getArray()
      .find((layer) => layer === this.riverLayer.getLayer())
  }
}
