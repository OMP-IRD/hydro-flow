import { StationsEntity } from './stations.models'
import * as StationsActions from './stations.actions'
import { State, initialState, reducer } from './stations.reducer'

describe('Stations Reducer', () => {
  const createStationsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as StationsEntity)

  describe('valid Stations actions', () => {
    it('loadStationsSuccess should return set the list of known Stations', () => {
      const stations = [
        createStationsEntity('PRODUCT-AAA'),
        createStationsEntity('PRODUCT-zzz'),
      ]
      const action = StationsActions.loadStationsSuccess({ stations })

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
