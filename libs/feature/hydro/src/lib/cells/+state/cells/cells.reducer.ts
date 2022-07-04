import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import Feature from 'ol/Feature'
import * as CellsActions from './cells.actions'

export const CELLS_FEATURE_KEY = 'cells'

export interface State extends EntityState<Feature> {
  selectedId?: string
  loaded: boolean
  error?: string | null
}

export interface CellsPartialState {
  readonly [CELLS_FEATURE_KEY]: State
}

function selectId(cell: Feature): string {
  return cell.getId() as string
}

export const cellsAdapter: EntityAdapter<Feature> =
  createEntityAdapter<Feature>({ selectId })

export const initialState: State = cellsAdapter.getInitialState({
  loaded: false,
})

const cellsReducer = createReducer(
  initialState,
  on(CellsActions.loadCellsSuccess, (state, { cells }) =>
    cellsAdapter.setAll(cells, { ...state, loaded: true })
  ),
  on(CellsActions.loadCellsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CellsActions.selectCell, (state, { selectedId }) => ({
    ...state,
    selectedId,
  }))
)

export function reducer(state: State | undefined, action: Action) {
  return cellsReducer(state, action)
}
