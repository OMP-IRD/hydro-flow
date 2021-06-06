import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import OlMap from 'ol/Map'
import { get as getProj } from 'ol/proj'
import ControlMousePosition from 'ol/control/MousePosition'
import { CoordinateFormatterService } from './coordinate-formatter.service'

@Component({
  selector: 'ui-mouse-position',
  templateUrl: './mouse-position.component.html',
  styleUrls: ['./mouse-position.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MousePositionComponent implements OnInit, OnChanges {
  @Input() map: OlMap
  @Input() projection = 'EPSG:3857'
  @Input() formatByProjection: Map<string, string>
  control: ControlMousePosition

  constructor(
    private _element: ElementRef,
    private _coordinateFormatter: CoordinateFormatterService
  ) {}

  ngOnInit() {
    const formatFn = function (coordinates: number[]) {
      const format = this.getformatForProjection(this.projection)
      const filterAndArgs = format.split(':')
      const filter = this._coordinateFormatter[filterAndArgs.shift()]
      const args = filterAndArgs
      args.unshift(coordinates)
      return filter.apply(this._coordinateFormatter, args)
    }

    this.control = new ControlMousePosition({
      coordinateFormat: formatFn.bind(this),
      target: this._element.nativeElement,
      undefinedHTML: undefined,
    })
    this.map.addControl(this.control)
    this.control.setProjection(getProj(this.projection))
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.control) {
      this.control.setProjection(getProj(this.projection))
    }
  }

  getformatForProjection(projection) {
    return (
      this.formatByProjection.get(projection) || 'numberCoordinates:2:{x} {y}'
    )
  }
}
