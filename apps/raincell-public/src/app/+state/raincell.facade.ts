import { Injectable } from '@angular/core'

import { select, Store } from '@ngrx/store'
import * as RaincellActions from './raincell.actions'
import * as RaincellSelectors from './raincell.selectors'

@Injectable({
  providedIn: 'root',
})
export class RaincellFacade {
  active$ = this.store.pipe(select(RaincellSelectors.getRaincellActive))

  constructor(private store: Store) {}

  setActive(active: string): void {
    this.store.dispatch(RaincellActions.setActive({ active }))
  }
}
