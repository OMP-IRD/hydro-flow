import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { HyfaaSegmentFocus } from '@hydro-flow/feature/hydro'
import { LegendSpec } from '@hydro-flow/ui/map'
import { TranslateService } from '@ngx-translate/core'
import { combineLatest, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { SaguiFacade } from '../../+state/sagui.facade'
import { BASSIN_RULES } from '../../layers/bassin.rules'
import { RiverSegmentLayer } from '../../layers/river-segment.layer'
import { STATION_COLOR, StationLayer } from '../../layers/station.layer'
import { SaguiTab } from '../../ui/ui.model'
import { TAB_COLOR_MAPPING } from '../../ui/ui.utils'

marker('sagui.stations.flow_previ.legend.description')
marker('sagui.stations.flow_alerts.legend.description')
marker('common.legend.locationofinterest')
marker('sagui.legend.bassin')

@Component({
  selector: 'hyfaa-legend-container',
  templateUrl: './legend-container.component.html',
  styleUrls: ['./legend-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegendContainerComponent implements OnInit {
  legend
  i18nReady$ = this.translate.get('sagui.legend.stations')
  stationLegend$: Observable<LegendSpec>

  bassinLegendSpec$: Observable<LegendSpec> = this.translate
    .get('sagui.legend.bassin')
    .pipe(
      map((title) => ({
        title,
        rules: BASSIN_RULES,
      }))
    )

  get mvtVisibility(): boolean {
    return this.riverLayer.getLayer().getVisible()
  }
  get stationVisibility(): boolean {
    return this.stationLayer.getLayer().getVisible()
  }

  constructor(
    private riverLayer: RiverSegmentLayer,
    private stationLayer: StationLayer,
    private translate: TranslateService,
    public facade: SaguiFacade
  ) {}

  ngOnInit(): void {
    this.stationLegend$ = combineLatest([
      this.i18nReady$,
      this.facade.tab$,
    ]).pipe(map(([_, tab]) => this.getStationLegend(tab)))
  }

  onStationVisibilityToggle(visible: boolean): void {
    this.stationLayer.getLayer().setVisible(visible)
  }

  onMvtVisibilityToggle(visible: boolean): void {
    this.riverLayer.getLayer().setVisible(visible)
  }

  onFocusChange(focus: HyfaaSegmentFocus): void {
    this.facade.setSegmentFocus(focus)
  }

  isRiver(tab: SaguiTab) {
    return tab === 'flow_previ' || tab === 'flow_alerts'
  }
  isBassin(tab: SaguiTab) {
    return tab === 'rain_alerts'
  }
  isAtmo(tab: SaguiTab) {
    return tab === 'atmo_alerts'
  }

  getStationLegend(tab: SaguiTab): LegendSpec {
    if (!this.isRiver(tab)) return null
    return {
      title: this.translate.instant('sagui.legend.stations'),
      description: this.translate.instant(
        `sagui.stations.${tab}.legend.description`
      ),
      rules: [
        {
          label: this.translate.instant('sagui.stations.legend.equal'),
          color: TAB_COLOR_MAPPING.n,
        },
        {
          label: this.translate.instant('sagui.stations.legend.1'),
          color: TAB_COLOR_MAPPING['1'],
        },
        {
          label: this.translate.instant('sagui.stations.legend.2'),
          color: TAB_COLOR_MAPPING['2'],
        },
        {
          label: this.translate.instant('sagui.stations.legend.3'),
          color: TAB_COLOR_MAPPING['3'],
        },
      ],
    }
  }
}
