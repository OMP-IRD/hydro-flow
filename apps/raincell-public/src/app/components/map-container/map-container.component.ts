import { Component, OnInit } from '@angular/core'
import { MapManagerService } from '../../map/map-manager.service'
import SETTINGS from '../../settings'

@Component({
  selector: 'raincell-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss'],
})
export class MapContainerComponent implements OnInit {
  bgLayerConfig = SETTINGS.backgroundLayers

  constructor(public mapManager: MapManagerService) {}

  ngOnInit(): void {}

  onDateChange(date: Date): void {}
  onAnimatorIndexChange(index: number): void {}
}
