import { Injectable } from '@angular/core'

import { select, Store } from '@ngrx/store'
import { distinctUntilChanged } from 'rxjs/operators'
import { setCurrentDate, setDates } from './date.actions'
import { getDateDate, getDateDates } from './date.selectors'

@Injectable({
  providedIn: 'root',
})
export class DateFacade {
  dates$ = this.store.pipe(select(getDateDates))
  currentDate$ = this.store.pipe(select(getDateDate), distinctUntilChanged())

  constructor(private store: Store) {}

  setDates(dates: Date[]): void {
    this.store.dispatch(setDates({ dates }))
  }

  setCurrentDate(date: Date): void {
    this.store.dispatch(setCurrentDate({ date }))
  }
}
