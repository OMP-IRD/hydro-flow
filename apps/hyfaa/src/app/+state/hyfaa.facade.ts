import { Injectable } from '@angular/core'

import { select, Store } from '@ngrx/store'
import { distinctUntilChanged } from 'rxjs/operators'
import * as HyfaaActions from './hyfaa.actions'
import * as HyfaaSelectors from './hyfaa.selectors'

@Injectable()
export class HyfaaFacade {
  dates$ = this.store.pipe(select(HyfaaSelectors.getHyfaaDates))
  currentDate$ = this.store.pipe(
    select(HyfaaSelectors.getHyfaaDate),
    distinctUntilChanged()
  )
  stationData$ = this.store.pipe(select(HyfaaSelectors.getHyfaaStationData))

  constructor(private store: Store) {}

  setDates(dates: Date[]): void {
    this.store.dispatch(HyfaaActions.setDates({ dates }))
  }

  setCurrentDate(date: Date): void {
    this.store.dispatch(HyfaaActions.setCurrentDate({ date }))
  }

  setStationId(stationId: number): void {
    this.store.dispatch(HyfaaActions.setStationId({ stationId }))
  }

  setStationData(stationData: any): void {
    this.store.dispatch(HyfaaActions.setStationData({ stationData }))
  }

  init() {}
}
