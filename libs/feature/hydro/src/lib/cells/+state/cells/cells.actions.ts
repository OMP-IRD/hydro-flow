import { createAction, props } from '@ngrx/store'
import Feature from 'ol/Feature'

export const loadCellsSuccess = createAction(
  '[Cells/API] Load Cells Success',
  props<{ feature: Feature }>()
)

export const loadCellsFailure = createAction(
  '[Cells/API] Load Cells Failure',
  props<{ error: any }>()
)

export const load = createAction(
  '[Cells] Select a cell',
  props<{ id: string }>()
)
