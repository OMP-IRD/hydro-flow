import { createAction, props } from '@ngrx/store'
import Feature from 'ol/Feature'

export const init = createAction('[Stations Page] Init')

export const loadStationsSuccess = createAction(
  '[Stations/API] Load Stations Success',
  props<{ stations: Feature[] }>()
)

export const loadStationsFailure = createAction(
  '[Stations/API] Load Stations Failure',
  props<{ error: any }>()
)

export const selectStation = createAction(
  '[Stations] Select a station',
  props<{ selectedId: number }>()
)
