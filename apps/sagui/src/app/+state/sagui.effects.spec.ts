import { TestBed } from '@angular/core/testing'

import { provideMockActions } from '@ngrx/effects/testing'
import { provideMockStore } from '@ngrx/store/testing'

import { DataPersistence, NxModule } from '@nrwl/angular'
import { hot } from 'jasmine-marbles'

import { Observable } from 'rxjs'
import * as HyfaaActions from './hyfaa.actions'

import { SaguiEffects } from './sagui.effects'

describe('HyfaaEffects', () => {
  let actions: Observable<any>
  let effects: SaguiEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        SaguiEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    })

    effects = TestBed.inject(SaguiEffects)
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
