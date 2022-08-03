import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { TabModel } from '../ui.model'

@Component({
  selector: 'sagui-tab-panel',
  templateUrl: './tab-panel.component.html',
  styleUrls: ['./tab-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabPanelComponent implements OnInit {
  @Input() tab: TabModel
  @Input() active = false

  constructor() {}

  ngOnInit(): void {}
}
