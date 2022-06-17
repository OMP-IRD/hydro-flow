import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core'
import ControlScaleLine from 'ol/control/ScaleLine'
import Map from 'ol/Map'
import { ViewUtilsService } from '../../services/view-utils.service'

@Component({
  selector: 'ui-scale-line',
  templateUrl: 'scale-line.component.html',
  styleUrls: ['./scale-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScaleLineComponent implements OnInit, OnDestroy {
  @Input() map: Map
  @Input() showScale = false
  control: ControlScaleLine
  scaleDenominator: string

  constructor(
    private _element: ElementRef,
    private _changeDetector: ChangeDetectorRef,
    private _viewUtils: ViewUtilsService
  ) {}

  ngOnInit() {
    this.control = new ControlScaleLine({
      target: this._element.nativeElement,
    })
    this.map.addControl(this.control)
    this.initScaleDenominator()
  }

  initScaleDenominator() {
    const view = this.map.getView()
    this.scaleDenominator = this.getFormattedDenominator(view.getResolution())
    this.map.getView().on('change:resolution', this.onResolutionChange)
  }

  onResolutionChange = (event) => {
    const view = event.target
    this.scaleDenominator = this.getFormattedDenominator(view.getResolution())
    this._changeDetector.markForCheck()
  }

  getFormattedDenominator(resolution: number) {
    const rawScaleDenominator =
      this._viewUtils.getScaleDenominatorFromResolution(resolution)
    const roundedScaleDenominator =
      Math.round(rawScaleDenominator / 5000) * 5000
    const formattedScaleDenominator = roundedScaleDenominator.toLocaleString()
    return formattedScaleDenominator
  }

  ngOnDestroy() {
    this.map.getView().un('change:resolution', this.onResolutionChange)
  }
}
