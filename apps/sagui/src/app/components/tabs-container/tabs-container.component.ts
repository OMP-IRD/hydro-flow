import { Component, OnInit } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { SaguiFacade } from '../../+state/sagui.facade'
import { ApiService } from '../../api/api.service'
import { TabModel } from '../../ui/ui.model'
import { alertCodeToColor, alertCodeToIcon } from '../../ui/ui.utils'

marker('sagui.tab.title.flow_previ')
marker('sagui.tab.title.flow_alerts')
marker('sagui.tab.title.rain_alerts')
marker('sagui.tab.title.atmo_alerts')

@Component({
  selector: 'sagui-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css'],
})
export class TabsContainerComponent implements OnInit {
  tabs$: Observable<TabModel[]> = this.api.dashboard().pipe(
    map((tabs) =>
      tabs.map((tab) => ({
        key: tab.id,
        color: alertCodeToColor(tab.alert_code),
        title: this.translate.instant(`sagui.tab.title.${tab.id}`),
        icon: alertCodeToIcon(tab.alert_code),
      }))
    )
  )

  constructor(
    public facade: SaguiFacade,
    private api: ApiService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {}

  onTabClick(tab: TabModel) {
    this.facade.setTab(tab.key)
  }
}
