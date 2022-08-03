import { Component, OnInit } from '@angular/core'
import { SaguiFacade } from '../../+state/sagui.facade'
import { ApiService } from '../../api/api.service'
import { TabModel } from '../../ui/ui.model'
import { alertCodeToColor } from '../../ui/ui.utils'

@Component({
  selector: 'sagui-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css'],
})
export class TabsContainerComponent implements OnInit {
  tabs: TabModel[]
  constructor(public facade: SaguiFacade, private api: ApiService) {}

  ngOnInit(): void {
    this.api.dashboard().subscribe(
      (tabs) =>
        (this.tabs = tabs.map((tab) => ({
          key: tab.id,
          color: alertCodeToColor(tab.alert_code),
          title: `sagui.tab.title.${tab.id}`,
          icon: tab.id,
        })))
    )
  }

  onTabClick(tab: TabModel) {
    this.facade.setTab(tab.key)
  }
}
