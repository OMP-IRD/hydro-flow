import { createAction, props } from '@ngrx/store'
import {
  LoadStationDataOptionsModel,
  StationDataModel,
} from './station-data.models'

export const loadStationData = createAction(
  '[StationData/API] Load StationData',
  props<{ stationId: number; options?: LoadStationDataOptionsModel }>()
)

export const loadStationDataSuccess = createAction(
  '[StationData/API] Load StationData Success',
  props<{ stationData: StationDataModel }>()
)

export const loadStationDataFailure = createAction(
  '[StationData/API] Load StationData Failure',
  props<{ error: any }>()
)
