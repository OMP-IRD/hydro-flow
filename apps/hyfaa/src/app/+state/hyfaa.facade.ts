import { Injectable } from '@angular/core'
import { HyfaaDataSerie } from '@hydro-flow/feature/hydro'

import { select, Store } from '@ngrx/store'
import { distinctUntilChanged } from 'rxjs/operators'
import * as HyfaaActions from './hyfaa.actions'
import * as HyfaaSelectors from './hyfaa.selectors'

@Injectable()
export class HyfaaFacade {
  dates$ = this.store.pipe(select(HyfaaSelectors.getHyfaaDates))
  dataSerie$ = this.store.pipe(select(HyfaaSelectors.getDataSerie))
  currentDate$ = this.store.pipe(
    select(HyfaaSelectors.getHyfaaDate),
    distinctUntilChanged()
  )

  constructor(private store: Store) {}

  setDates(dates: Date[]): void {
    this.store.dispatch(HyfaaActions.setDates({ dates }))
  }

  setCurrentDate(date: Date): void {
    this.store.dispatch(HyfaaActions.setCurrentDate({ date }))
  }

  setDataSerie(dataSerie: HyfaaDataSerie): void {
    this.store.dispatch(HyfaaActions.setDataSerie({ dataSerie }))
  }
}
