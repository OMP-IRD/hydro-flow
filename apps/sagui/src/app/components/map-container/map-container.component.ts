import { Component, OnInit } from '@angular/core'
import SETTINGS from '../../../settings'
import { RiverSegmentLayer } from '../../layers/river-segment.layer'
import { StationLayer } from '../../layers/station.layer'
import { MapManagerService } from '../../map/map-manager.service'

@Component({
  selector: 'hyfaa-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss'],
})
export class MapContainerComponent implements OnInit {
  bgLayerConfig = SETTINGS.backgroundLayers

  constructor(
    public mapManager: MapManagerService,
    private riverLayer: RiverSegmentLayer,
    private stationLayer: StationLayer
  ) {}

  ngOnInit(): void {
    this.mapManager.map.addLayer(this.riverLayer.getLayer())
    this.mapManager.map.addLayer(this.stationLayer.getLayer())
  }
}
