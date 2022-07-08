import { createAction, props } from '@ngrx/store'
import Feature from 'ol/Feature'
import { RaincellFrequence } from '../../api/cells.model'

export const loadCellsSuccess = createAction(
  '[Cells/API] Load Cells Success',
  props<{ feature: Feature }>()
)

export const loadCellsFailure = createAction(
  '[Cells/API] Load Cells Failure',
  props<{ error: any }>()
)

export const setFrequence = createAction(
  '[Cells/API] Set frequence',
  props<{ frequence: RaincellFrequence }>()
)

export const load = createAction('[Cells] Load a Cell', props<{ id: string }>())

export const reset = createAction('[Cells] Reset')
