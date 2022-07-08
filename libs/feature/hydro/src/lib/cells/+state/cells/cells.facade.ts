import { Injectable } from '@angular/core'

import { select, Store } from '@ngrx/store'
import * as CellsActions from './cells.actions'
import * as CellsSelectors from './cells.selectors'

@Injectable()
export class CellsFacade {
  loaded$ = this.store.pipe(select(CellsSelectors.getCellsLoaded))
  feature$ = this.store.pipe(select(CellsSelectors.getCellsFeature))

  constructor(private store: Store) {}

  load(id: string) {
    this.store.dispatch(CellsActions.load({ id }))
  }
}
