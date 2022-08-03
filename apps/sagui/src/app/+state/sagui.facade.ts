import { Injectable } from '@angular/core'
import { HyfaaDataSerie, HyfaaSegmentFocus } from '@hydro-flow/feature/hydro'

import { select, Store } from '@ngrx/store'
import { SaguiTab } from '../ui/ui.model'
import * as SaguiActions from './sagui.actions'
import * as SaguiSelectors from './sagui.selectors'

@Injectable()
export class SaguiFacade {
  dataSerie$ = this.store.pipe(select(SaguiSelectors.getDataSerie))
  segmentFocus$ = this.store.pipe(select(SaguiSelectors.getSegmentFocus))
  tab$ = this.store.pipe(select(SaguiSelectors.getTab))

  constructor(private store: Store) {}

  setDataSerie(dataSerie: HyfaaDataSerie): void {
    this.store.dispatch(SaguiActions.setDataSerie({ dataSerie }))
  }
  setSegmentFocus(segmentFocus: HyfaaSegmentFocus): void {
    this.store.dispatch(SaguiActions.setSegmentFocus({ segmentFocus }))
  }
  setTab(tab: SaguiTab): void {
    this.store.dispatch(SaguiActions.setTab({ tab }))
  }
}
