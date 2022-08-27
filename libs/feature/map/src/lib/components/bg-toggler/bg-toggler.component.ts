import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import Layer from 'ol/layer/Base'
import Map from 'ol/Map'
import {
  LayerFactoryService,
  LayerSpec,
} from '../../services/layer-factory.service'

@Component({
  selector: 'map-bg-toggler',
  templateUrl: './bg-toggler.component.html',
  styleUrls: ['./bg-toggler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BGTogglerComponent implements OnInit {
  @Input() map: Map
  @Input() config: LayerSpec[]
  @Input() width = 90

  layerIndex = 0
  layers: Layer[]

  constructor(private layerFactory: LayerFactoryService) {}

  ngOnInit() {
    this.initLayers()
    this.setLayer()
  }

  toggle() {
    this.layerIndex = Math.abs(this.layerIndex - 1)
    this.setLayer()
  }

  setLayer() {
    this.map.getLayers().setAt(0, this.layers[this.layerIndex])
  }

  initLayers(): void {
    this.layers = this.config.map((layerSpec) =>
      this.layerFactory.create(layerSpec)
    )
  }

  getImageSrc(): string {
    const otherIndex = Math.abs(this.layerIndex - 1)
    return `assets/bg-toggler/${this.config[otherIndex].id}.png`
  }
}
