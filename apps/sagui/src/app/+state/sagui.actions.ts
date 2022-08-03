import { HyfaaDataSerie, HyfaaSegmentFocus } from '@hydro-flow/feature/hydro'
import { createAction, props } from '@ngrx/store'
import { SaguiTab } from '../ui/ui.model'

export const setDataSerie = createAction(
  '[Sagui] Set data serie',
  props<{ dataSerie: HyfaaDataSerie }>()
)

export const setSegmentFocus = createAction(
  '[Sagui] Set segment focus',
  props<{ segmentFocus: HyfaaSegmentFocus }>()
)

export const setTab = createAction(
  '[Sagui] Set active tab',
  props<{ tab: SaguiTab }>()
)
