import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core'
import { LegendSpec } from '@hydro-flow/ui/map'

@Component({
  selector: 'ui-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegendComponent implements OnInit {
  @Input() spec: LegendSpec
  @Input() visible: boolean
  @Output() changeVisibility = new EventEmitter<boolean>()

  constructor() {}

  ngOnInit(): void {}

  onCheckboxClick(): void {
    this.changeVisibility.emit(!this.visible)
  }
}
