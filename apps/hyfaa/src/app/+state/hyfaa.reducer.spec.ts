import { HyfaaEntity } from './hyfaa.models'
import * as HyfaaActions from './hyfaa.actions'
import { State, initialState, reducer } from './hyfaa.reducer'

describe('Hyfaa Reducer', () => {
  const createHyfaaEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as HyfaaEntity)

  beforeEach(() => {})

  describe('valid Hyfaa actions', () => {
    it('loadHyfaaSuccess should return set the list of known Hyfaa', () => {
      const hyfaa = [
        createHyfaaEntity('PRODUCT-AAA'),
        createHyfaaEntity('PRODUCT-zzz'),
      ]
      const action = HyfaaActions.loadHyfaaSuccess({ hyfaa })

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
