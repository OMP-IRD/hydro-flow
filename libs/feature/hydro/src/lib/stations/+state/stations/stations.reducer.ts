import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import Feature from 'ol/Feature'
import * as StationsActions from './stations.actions'

export const STATIONS_FEATURE_KEY = 'stations'

export interface State extends EntityState<Feature> {
  selectedId?: number // which Stations record has been selected
  loaded: boolean // has the Stations list been loaded
  error?: string | null // last known error (if any)
}

export interface StationsPartialState {
  readonly [STATIONS_FEATURE_KEY]: State
}

function selectId(station: Feature): string {
  return station.getId() as string
}

export const stationsAdapter: EntityAdapter<Feature> =
  createEntityAdapter<Feature>({ selectId })

export const initialState: State = stationsAdapter.getInitialState({
  loaded: false,
})

const stationsReducer = createReducer(
  initialState,
  on(StationsActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(StationsActions.loadStationsSuccess, (state, { stations }) =>
    stationsAdapter.setAll(stations, { ...state, loaded: true })
  ),
  on(StationsActions.loadStationsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(StationsActions.selectStation, (state, { selectedId }) => ({
    ...state,
    selectedId,
  }))
)

export function reducer(state: State | undefined, action: Action) {
  return stationsReducer(state, action)
}
