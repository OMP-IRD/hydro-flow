import { TestBed, async } from '@angular/core/testing'

import { Observable } from 'rxjs'

import { provideMockActions } from '@ngrx/effects/testing'
import { provideMockStore } from '@ngrx/store/testing'

import { NxModule, DataPersistence } from '@nrwl/angular'
import { hot } from '@nrwl/angular/testing'

import { StationsEffects } from './stations.effects'
import * as StationsActions from './stations.actions'

describe('StationsEffects', () => {
  let actions: Observable<any>
  let effects: StationsEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        StationsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    })

    effects = TestBed.inject(StationsEffects)
  })

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: StationsActions.init() })

      const expected = hot('-a-|', {
        a: StationsActions.loadStationsSuccess({ stations: [] }),
      })

      expect(effects.init$).toBeObservable(expected)
    })
  })
})
