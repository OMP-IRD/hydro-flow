import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { HyfaaSegmentFocus } from '@hydro-flow/feature/hydro'
import { geostylerToLegend } from '@hydro-flow/feature/map'
import { LegendComponent } from '@hydro-flow/ui/map'
import { RIVER_SEGMENT_STYLE_GS_COLOR } from '../../layers/river-segment.style'

@Component({
  selector: 'hyfaa-segment-legend',
  templateUrl: './segment-legend.component.html',
  styleUrls: ['./segment-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentLegendComponent extends LegendComponent implements OnInit {
  @Input() focus: HyfaaSegmentFocus
  @Output() changeFocus = new EventEmitter<HyfaaSegmentFocus>()

  constructor() {
    super()
  }

  ngOnInit(): void {
    this.spec = {
      title: 'Segments',
      rules: geostylerToLegend(RIVER_SEGMENT_STYLE_GS_COLOR[this.focus]),
    }
  }

  onChangeFocus(focus: HyfaaSegmentFocus): void {
    this.changeFocus.emit(focus)
    this.spec.rules = geostylerToLegend(RIVER_SEGMENT_STYLE_GS_COLOR[focus])
  }
}
