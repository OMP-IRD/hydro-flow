import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { LegendSpec } from '../../model/legend.model'

@Component({
  selector: 'ui-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegendComponent {
  @Input() spec: LegendSpec
  @Input() visible: boolean
  @Output() changeVisibility = new EventEmitter<boolean>()

  onCheckboxClick(): void {
    this.changeVisibility.emit(!this.visible)
  }
}
