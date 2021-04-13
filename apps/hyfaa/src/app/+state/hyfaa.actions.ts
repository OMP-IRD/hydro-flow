import { createAction, props } from '@ngrx/store'

export const setDates = createAction(
  '[Hyfaa] Set dates',
  props<{ dates: Date[] }>()
)

export const setCurrentDate = createAction(
  '[Hyfaa] Set current date',
  props<{ date: Date }>()
)
