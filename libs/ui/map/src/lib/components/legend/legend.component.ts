import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
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

  constructor() {}

  ngOnInit(): void {}
}
