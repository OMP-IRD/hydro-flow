import { HyfaaEntity } from './hyfaa.models'
import { State, hyfaaAdapter, initialState } from './hyfaa.reducer'
import * as HyfaaSelectors from './hyfaa.selectors'

describe('Hyfaa Selectors', () => {
  const ERROR_MSG = 'No Error Available'
  const getHyfaaId = (it) => it['id']
  const createHyfaaEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as HyfaaEntity)

  let state

  beforeEach(() => {
    state = {
      hyfaa: hyfaaAdapter.setAll(
        [
          createHyfaaEntity('PRODUCT-AAA'),
          createHyfaaEntity('PRODUCT-BBB'),
          createHyfaaEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    }
  })

  describe('Hyfaa Selectors', () => {
    it('getAllHyfaa() should return the list of Hyfaa', () => {
      const results = HyfaaSelectors.getAllHyfaa(state)
      const selId = getHyfaaId(results[1])

      expect(results.length).toBe(3)
      expect(selId).toBe('PRODUCT-BBB')
    })

    it('getSelected() should return the selected Entity', () => {
      const result = HyfaaSelectors.getSelected(state)
      const selId = getHyfaaId(result)

      expect(selId).toBe('PRODUCT-BBB')
    })

    it("getHyfaaLoaded() should return the current 'loaded' status", () => {
      const result = HyfaaSelectors.getHyfaaLoaded(state)

      expect(result).toBe(true)
    })

    it("getHyfaaError() should return the current 'error' state", () => {
      const result = HyfaaSelectors.getHyfaaError(state)

      expect(result).toBe(ERROR_MSG)
    })
  })
})
