import { createAction, props } from '@ngrx/store'

export const setDate = createAction(
  '[Raincell] Set date',
  props<{ date: Date }>()
)
