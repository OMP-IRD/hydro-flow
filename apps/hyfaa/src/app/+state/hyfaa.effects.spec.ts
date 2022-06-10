import { TestBed, async } from '@angular/core/testing'

import { Observable } from 'rxjs'

import { provideMockActions } from '@ngrx/effects/testing'
import { provideMockStore } from '@ngrx/store/testing'

import { NxModule, DataPersistence } from '@nrwl/angular'

import { HyfaaEffects } from './hyfaa.effects'
import * as HyfaaActions from './hyfaa.actions'
import { hot } from 'jasmine-marbles'

describe('HyfaaEffects', () => {
  let actions: Observable<any>
  let effects: HyfaaEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        HyfaaEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    })

    effects = TestBed.inject(HyfaaEffects)
  })

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: HyfaaActions.init() })

      const expected = hot('-a-|', {
        a: HyfaaActions.loadHyfaaSuccess({ hyfaa: [] }),
      })

      expect(effects.init$).toBeObservable(expected)
    })
  })
})
