import { createAction, props } from '@ngrx/store'

export const setDates = createAction(
  '[Date selector] Set dates',
  props<{ dates: string[] }>()
)

export const setCurrentDate = createAction(
  '[Date selector] Set current date',
  props<{ date: string }>()
)
