import { Injectable } from '@angular/core'
import { HyfaaDataSerie, HyfaaSegmentFocus } from '@hydro-flow/feature/hydro'

import { select, Store } from '@ngrx/store'
import * as HyfaaActions from './hyfaa.actions'
import * as HyfaaSelectors from './hyfaa.selectors'

@Injectable()
export class HyfaaFacade {
  dataSerie$ = this.store.pipe(select(HyfaaSelectors.getDataSerie))
  segmentFocus$ = this.store.pipe(select(HyfaaSelectors.getSegmentFocus))

  constructor(private store: Store) {}

  setDataSerie(dataSerie: HyfaaDataSerie): void {
    this.store.dispatch(HyfaaActions.setDataSerie({ dataSerie }))
  }
  setSegmentFocus(segmentFocus: HyfaaSegmentFocus): void {
    this.store.dispatch(HyfaaActions.setSegmentFocus({ segmentFocus }))
  }
}
