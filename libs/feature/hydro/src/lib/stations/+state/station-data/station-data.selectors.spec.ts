import { StationDataEntity } from './station-data.models'
import { State, stationDataAdapter, initialState } from './station-data.reducer'
import * as StationDataSelectors from './station-data.selectors'

describe('StationData Selectors', () => {
  const ERROR_MSG = 'No Error Available'
  const getStationDataId = (it) => it['id']
  const createStationDataEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as StationDataEntity)

  let state

  beforeEach(() => {
    state = {
      stationData: stationDataAdapter.setAll(
        [
          createStationDataEntity('PRODUCT-AAA'),
          createStationDataEntity('PRODUCT-BBB'),
          createStationDataEntity('PRODUCT-CCC'),
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

  describe('StationData Selectors', () => {
    it('getAllStationData() should return the list of StationData', () => {
      const results = StationDataSelectors.getAllStationData(state)
      const selId = getStationDataId(results[1])

      expect(results.length).toBe(3)
      expect(selId).toBe('PRODUCT-BBB')
    })

    it('getSelected() should return the selected Entity', () => {
      const result = StationDataSelectors.getSelected(state)
      const selId = getStationDataId(result)

      expect(selId).toBe('PRODUCT-BBB')
    })

    it("getStationDataLoaded() should return the current 'loaded' status", () => {
      const result = StationDataSelectors.getStationDataLoaded(state)

      expect(result).toBe(true)
    })

    it("getStationDataError() should return the current 'error' state", () => {
      const result = StationDataSelectors.getStationDataError(state)

      expect(result).toBe(ERROR_MSG)
    })
  })
})
