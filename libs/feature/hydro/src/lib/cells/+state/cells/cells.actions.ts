import { createAction, props } from '@ngrx/store'
import Feature from 'ol/Feature'

export const loadCellsSuccess = createAction(
  '[Cells/API] Load Cells Success',
  props<{ cells: Feature[] }>()
)

export const loadCellsFailure = createAction(
  '[Cells/API] Load Cells Failure',
  props<{ error: any }>()
)

export const selectCell = createAction(
  '[Cells] Select a cell',
  props<{ selectedId: string }>()
)
