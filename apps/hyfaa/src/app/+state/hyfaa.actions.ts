import { createAction, props } from '@ngrx/store'

export const setDates = createAction(
  '[Hyfaa] Set dates',
  props<{ dates: Date[] }>()
)

export const setCurrentDate = createAction(
  '[Hyfaa] Set current date',
  props<{ date: Date }>()
)

export const setStationId = createAction(
  '[Hyfaa] Set station id',
  props<{ stationId: number }>()
)

export const setStationData = createAction(
  '[Hyfaa] Set station data',
  props<{ stationData: any }>()
)
