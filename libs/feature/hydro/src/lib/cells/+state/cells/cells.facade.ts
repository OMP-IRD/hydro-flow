import { Injectable } from '@angular/core'

import { select, Store } from '@ngrx/store'

import * as CellsActions from './cells.actions'
import * as CellsSelectors from './cells.selectors'

@Injectable()
export class CellsFacade {
  loaded$ = this.store.pipe(select(CellsSelectors.getCellsLoaded))
  allCells$ = this.store.pipe(select(CellsSelectors.getAllCells))
  selectedCells$ = this.store.pipe(select(CellsSelectors.getSelectedCell))
  date$ = this.store.pipe(select(CellsSelectors.getCellsDate))

  constructor(private store: Store) {}

  selectCell(selectedId: string) {
    this.store.dispatch(CellsActions.selectCell({ selectedId }))
  }
  setDate(date: Date): void {
    this.store.dispatch(CellsActions.setDate({ date }))
  }
}
