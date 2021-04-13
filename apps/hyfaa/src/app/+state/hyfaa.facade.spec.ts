import { NgModule } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { readFirst } from '@nrwl/angular/testing'

import { EffectsModule } from '@ngrx/effects'
import { StoreModule, Store } from '@ngrx/store'

import { NxModule } from '@nrwl/angular'

import { HyfaaEntity } from './hyfaa.models'
import { HyfaaEffects } from './hyfaa.effects'
import { HyfaaFacade } from './hyfaa.facade'

import * as HyfaaSelectors from './hyfaa.selectors'
import * as HyfaaActions from './hyfaa.actions'
import {
  HYFAA_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './hyfaa.reducer'

interface TestSchema {
  hyfaa: State
}

describe('HyfaaFacade', () => {
  let facade: HyfaaFacade
  let store: Store<TestSchema>
  const createHyfaaEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as HyfaaEntity)

  beforeEach(() => {})

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(HYFAA_FEATURE_KEY, reducer),
          EffectsModule.forFeature([HyfaaEffects]),
        ],
        providers: [HyfaaFacade],
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
      facade = TestBed.inject(HyfaaFacade)
    })

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allHyfaa$)
        let isLoaded = await readFirst(facade.loaded$)

        expect(list.length).toBe(0)
        expect(isLoaded).toBe(false)

        facade.init()

        list = await readFirst(facade.allHyfaa$)
        isLoaded = await readFirst(facade.loaded$)

        expect(list.length).toBe(0)
        expect(isLoaded).toBe(true)

        done()
      } catch (err) {
        done.fail(err)
      }
    })

    /**
     * Use `loadHyfaaSuccess` to manually update list
     */
    it('allHyfaa$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allHyfaa$)
        let isLoaded = await readFirst(facade.loaded$)

        expect(list.length).toBe(0)
        expect(isLoaded).toBe(false)

        store.dispatch(
          HyfaaActions.loadHyfaaSuccess({
            hyfaa: [createHyfaaEntity('AAA'), createHyfaaEntity('BBB')],
          })
        )

        list = await readFirst(facade.allHyfaa$)
        isLoaded = await readFirst(facade.loaded$)

        expect(list.length).toBe(2)
        expect(isLoaded).toBe(true)

        done()
      } catch (err) {
        done.fail(err)
      }
    })
  })
})
