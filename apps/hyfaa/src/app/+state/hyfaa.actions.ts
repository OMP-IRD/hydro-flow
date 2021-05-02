import { createAction, props } from '@ngrx/store'
import { HyfaaDataSerie } from './hyfaa.models'

export const setDates = createAction(
  '[Hyfaa] Set dates',
  props<{ dates: Date[] }>()
)

export const setCurrentDate = createAction(
  '[Hyfaa] Set current date',
  props<{ date: Date }>()
)

export const setDataSerie = createAction(
  '[Hyfaa] Set current date',
  props<{ dataSerie: HyfaaDataSerie }>()
)
