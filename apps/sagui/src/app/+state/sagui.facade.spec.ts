import { NgModule } from '@angular/core'
import { TestBed } from '@angular/core/testing'

import { EffectsModule } from '@ngrx/effects'
import { Store, StoreModule } from '@ngrx/store'

import { NxModule } from '@nrwl/angular'
import { readFirst } from '@nrwl/angular/testing'
import { SaguiEffects } from './sagui.effects'
import { SaguiFacade } from './sagui.facade'

import { AppState, HYFAA_FEATURE_KEY, reducer } from './hyfaa.reducer'

interface TestSchema {
  hyfaa: AppState
}

class HyfaaEntity {}

describe('HyfaaFacade', () => {
  let facade: SaguiFacade
  let store: Store<TestSchema>
  const createHyfaaEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as HyfaaEntity)

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(HYFAA_FEATURE_KEY, reducer),
          EffectsModule.forFeature([SaguiEffects]),
        ],
        providers: [SaguiFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] })

      store = TestBed.inject(Store)
      facade = TestBed.inject(SaguiFacade)
    })

    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let currentDate = await readFirst(facade.currentDate$)

        expect(currentDate).toBe(0)

        facade.setCurrentDate(new Date('01-01-2020'))

        currentDate = await readFirst(facade.currentDate$)

        expect(currentDate).toBe(0)

        done()
      } catch (err) {
        done.fail(err)
      }
    })
  })
})
