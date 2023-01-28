import { Injectable } from '@angular/core'
import { DateFacade } from '@hydro-flow/feature/time'
import ImageLayer from 'ol/layer/Image'
import { transformExtent } from 'ol/proj'
import { ImageStatic } from 'ol/source'
import { combineLatest, Observable } from 'rxjs'
import { filter, map, shareReplay } from 'rxjs/operators'
import { SaguiFacade } from '../+state/sagui.facade'
import { AtmoAlertModel, AtmoExtent } from '../api/api.model'
import { ApiService } from '../api/api.service'
import { MapManagerService } from '../map/map-manager.service'
import { SaguiTab } from '../ui/ui.model'

@Injectable({
  providedIn: 'root',
})
export class AtmoLayer {
  atmoResponse$: Observable<AtmoAlertModel>
  atmoDates$: Observable<string[]>
  layer = new ImageLayer()
  tab: SaguiTab

  constructor(
    private dateFacade: DateFacade,
    private facade: SaguiFacade,
    private api: ApiService,
    public mapManager: MapManagerService
  ) {}

  initLayer() {
    this.atmoResponse$ = this.api.atmo().pipe(shareReplay())
    this.atmoDates$ = this.atmoResponse$.pipe(
      map((atmo) => atmo.results.map((res) => res.date).reverse())
    )

    combineLatest([this.facade.tab$, this.atmoDates$]).subscribe(
      ([tab, dates]) => {
        this.tab = tab
        this.dateFacade.setDates(dates)
        this.dateFacade.setCurrentDate(dates[dates.length - 1])
      }
    )

    combineLatest([
      this.atmoResponse$,
      this.dateFacade.currentDate$.pipe(filter((date) => !!date)),
    ]).subscribe(([atmo, date]) => {
      if (this.tab === 'atmo_alerts') {
        this.layer.setSource(
          new ImageStatic({
            imageSize: [280, 240],
            imageExtent: transformExtent(
              this.toExtent(atmo.extent),
              'EPSG:4326',
              'EPSG:3857'
            ),
            url: atmo.results.find((res) => res.date === date).png,
          })
        )
      }
    })
  }

  toExtent(atmoExtent: AtmoExtent) {
    const { east, north, south, west } = atmoExtent
    return [west, south, east, north]
  }
}
