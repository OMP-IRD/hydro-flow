import { StationsEntity } from './stations.models'
import { State, stationsAdapter, initialState } from './stations.reducer'
import * as StationsSelectors from './stations.selectors'

describe('Stations Selectors', () => {
  const ERROR_MSG = 'No Error Available'
  const getStationsId = (it) => it['id']
  const createStationsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as StationsEntity)

  let state

  beforeEach(() => {
    state = {
      stations: stationsAdapter.setAll(
        [
          createStationsEntity('PRODUCT-AAA'),
          createStationsEntity('PRODUCT-BBB'),
          createStationsEntity('PRODUCT-CCC'),
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

  describe('Stations Selectors', () => {
    it('getAllStations() should return the list of Stations', () => {
      const results = StationsSelectors.getAllStations(state)
      const selId = getStationsId(results[1])

      expect(results.length).toBe(3)
      expect(selId).toBe('PRODUCT-BBB')
    })

    it('getSelected() should return the selected Entity', () => {
      const result = StationsSelectors.getSelected(state)
      const selId = getStationsId(result)

      expect(selId).toBe('PRODUCT-BBB')
    })

    it("getStationsLoaded() should return the current 'loaded' status", () => {
      const result = StationsSelectors.getStationsLoaded(state)

      expect(result).toBe(true)
    })

    it("getStationsError() should return the current 'error' state", () => {
      const result = StationsSelectors.getStationsError(state)

      expect(result).toBe(ERROR_MSG)
    })
  })
})
