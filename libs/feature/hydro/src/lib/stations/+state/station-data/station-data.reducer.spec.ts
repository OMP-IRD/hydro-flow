import { StationDataModel } from './station-data.models'
import * as StationDataActions from './station-data.actions'
import { State, initialState, reducer } from './station-data.reducer'

describe('StationData Reducer', () => {
  const createStationDataEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as StationDataModel)

  describe('valid StationData actions', () => {
    it('loadStationDataSuccess should return set the list of known StationData', () => {
      const stationData = [
        createStationDataEntity('PRODUCT-AAA'),
        createStationDataEntity('PRODUCT-zzz'),
      ]
      const action = StationDataActions.loadStationDataSuccess({ stationData })

      const result: State = reducer(initialState, action)

      expect(result.loaded).toBe(true)
      expect(result.ids.length).toBe(2)
    })
  })

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any

      const result = reducer(initialState, action)

      expect(result).toBe(initialState)
    })
  })
})
