import { TestBed, async } from '@angular/core/testing'

import { Observable } from 'rxjs'

import { provideMockActions } from '@ngrx/effects/testing'
import { provideMockStore } from '@ngrx/store/testing'

import { NxModule, DataPersistence } from '@nrwl/angular'
import { hot } from '@nrwl/angular/testing'

import { StationDataEffects } from './station-data.effects'
import * as StationDataActions from './station-data.actions'

describe('StationDataEffects', () => {
  let actions: Observable<any>
  let effects: StationDataEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        StationDataEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    })

    effects = TestBed.inject(StationDataEffects)
  })

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: StationDataActions.init() })

      const expected = hot('-a-|', {
        a: StationDataActions.loadStationDataSuccess({ stationData: [] }),
      })

      expect(effects.init$).toBeObservable(expected)
    })
  })
})
