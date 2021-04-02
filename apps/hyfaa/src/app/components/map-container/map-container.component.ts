import { Component, Input, OnInit } from '@angular/core'
import { RiverSegmentLayer } from '../../layers/river-segment.layer'
import { MapManagerService } from '../../map/map-manager.service'

@Component({
  selector: 'hyfaa-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss'],
})
export class MapContainerComponent implements OnInit {
  constructor(
    public mapManager: MapManagerService,
    private riverLayer: RiverSegmentLayer
  ) {}

  ngOnInit(): void {
    this.mapManager.map.addLayer(this.riverLayer.getLayer())
    // this.map.getView().fit(this.riverLayer.getExtent())
  }
}
