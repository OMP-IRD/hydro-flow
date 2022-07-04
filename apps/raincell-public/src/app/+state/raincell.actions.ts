import { createAction, props } from '@ngrx/store'

export const setActive = createAction(
  '[Raincell] Set active',
  props<{ active: string }>()
)
