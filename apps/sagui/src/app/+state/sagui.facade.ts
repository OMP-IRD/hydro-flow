import { Injectable } from '@angular/core'
import { HyfaaDataSerie, HyfaaSegmentFocus } from '@hydro-flow/feature/hydro'

import { select, Store } from '@ngrx/store'
import * as SaguiActions from './sagui.actions'
import * as SaguiSelectors from './sagui.selectors'

@Injectable()
export class SaguiFacade {
  dataSerie$ = this.store.pipe(select(SaguiSelectors.getDataSerie))
  segmentFocus$ = this.store.pipe(select(SaguiSelectors.getSegmentFocus))

  constructor(private store: Store) {}

  setDataSerie(dataSerie: HyfaaDataSerie): void {
    this.store.dispatch(SaguiActions.setDataSerie({ dataSerie }))
  }
  setSegmentFocus(segmentFocus: HyfaaSegmentFocus): void {
    this.store.dispatch(SaguiActions.setSegmentFocus({ segmentFocus }))
  }
}
