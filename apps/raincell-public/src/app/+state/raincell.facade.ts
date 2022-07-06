import { Injectable } from '@angular/core'

import { select, Store } from '@ngrx/store'
import * as RaincellActions from './raincell.actions'
import * as RaincellSelectors from './raincell.selectors'

@Injectable({
  providedIn: 'root',
})
export class RaincellFacade {
  date$ = this.store.pipe(select(RaincellSelectors.getRaincellDate))

  constructor(private store: Store) {}

  setDate(date: Date): void {
    this.store.dispatch(RaincellActions.setDate({ date }))
  }
}
