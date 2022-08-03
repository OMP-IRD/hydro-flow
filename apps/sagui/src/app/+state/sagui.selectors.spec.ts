import { initialState } from './hyfaa.reducer'
import * as HyfaaSelectors from './hyfaa.selectors'

describe('Hyfaa Selectors', () => {
  const ERROR_MSG = 'No Error Available'

  let state

  beforeEach(() => {
    state = {
      hyfaa: {
        ...initialState,
        dataSerie: 'mgbstandard',
        segmentFocus: 'flow',
      },
    }
  })

  describe('Hyfaa Selectors', () => {
    it('getDataSerie() returns the data serie', () => {
      const result = HyfaaSelectors.getDataSerie(state)

      expect(result).toEqual('mgbstandard')
    })
    it('getSegmentFocus() returns the focused segment', () => {
      const result = HyfaaSelectors.getSegmentFocus(state)

      expect(result).toEqual('flow')
    })
  })
})
