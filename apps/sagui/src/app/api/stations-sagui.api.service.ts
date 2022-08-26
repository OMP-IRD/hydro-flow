import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { first, pluck, switchMap } from 'rxjs/operators'
import { SaguiFacade } from '../+state/sagui.facade'
import { DashboardItemModel } from './api.model'
import { ApiService } from './api.service'

@Injectable()
export class StationsSaguiApiService {
  constructor(private facade: SaguiFacade, private api: ApiService) {}

  getStationsAsGeojson(): Observable<DashboardItemModel[]> {
    return this.facade.tab$.pipe(
      first(),
      switchMap((tab) => this.api.stations(tab)),
      pluck('results')
    )
  }
}
