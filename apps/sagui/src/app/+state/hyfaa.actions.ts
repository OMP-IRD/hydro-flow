import { HyfaaDataSerie, HyfaaSegmentFocus } from '@hydro-flow/feature/hydro'
import { createAction, props } from '@ngrx/store'

export const setDataSerie = createAction(
  '[Hyfaa] Set data serie',
  props<{ dataSerie: HyfaaDataSerie }>()
)

export const setSegmentFocus = createAction(
  '[Hyfaa] Set segment focus',
  props<{ segmentFocus: HyfaaSegmentFocus }>()
)
