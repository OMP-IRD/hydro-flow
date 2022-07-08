import { Injectable } from '@angular/core'

import { select, Store } from '@ngrx/store'
import { RaincellFrequence } from '../../api/cells.model'
import * as CellsActions from './cells.actions'
import * as CellsSelectors from './cells.selectors'

@Injectable()
export class CellsFacade {
  loaded$ = this.store.pipe(select(CellsSelectors.getCellsLoaded))
  feature$ = this.store.pipe(select(CellsSelectors.getCellsFeature))
  frequence$ = this.store.pipe(select(CellsSelectors.getCellsFrequence))

  constructor(private store: Store) {}

  load(id: string) {
    this.store.dispatch(CellsActions.load({ id }))
  }
  reset() {
    this.store.dispatch(CellsActions.reset())
  }
  setFrequence(frequence: RaincellFrequence) {
    this.store.dispatch(CellsActions.setFrequence({ frequence }))
  }
}
