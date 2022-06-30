import { Component, OnInit } from '@angular/core'
import { CellsLayer } from '../../layers/cells.layer'
import { MapManagerService } from '../../map/map-manager.service'
import SETTINGS from '../../settings'

@Component({
  selector: 'raincell-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss'],
})
export class MapContainerComponent implements OnInit {
  bgLayerConfig = SETTINGS.backgroundLayers

  constructor(
    public mapManager: MapManagerService,
    private cellsLayer: CellsLayer
  ) {}

  ngOnInit(): void {
    this.mapManager.map.addLayer(this.cellsLayer.getLayer())
  }

  onDateChange(date: Date): void {}
  onAnimatorIndexChange(index: number): void {}
}
