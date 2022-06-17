import { NgModule } from '@angular/core'
import { TestBed } from '@angular/core/testing'

import { EffectsModule } from '@ngrx/effects'
import { Store, StoreModule } from '@ngrx/store'

import { NxModule } from '@nrwl/angular'
import { readFirst } from '@nrwl/angular/testing'
import * as StationDataActions from './station-data.actions'
import { StationDataEffects } from './station-data.effects'
import { StationDataFacade } from './station-data.facade'

import { StationDataEntity } from './station-data.models'
import { reducer, State, STATIONDATA_FEATURE_KEY } from './station-data.reducer'

interface TestSchema {
  stationData: State
}

describe('StationDataFacade', () => {
  let facade: StationDataFacade
  let store: Store<TestSchema>
  const createStationDataEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as StationDataEntity)

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(STATIONDATA_FEATURE_KEY, reducer),
          EffectsModule.forFeature([StationDataEffects]),
        ],
        providers: [StationDataFacade],
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
      facade = TestBed.inject(StationDataFacade)
    })

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allStationData$)
        let isLoaded = await readFirst(facade.loaded$)

        expect(list.length).toBe(0)
        expect(isLoaded).toBe(false)

        facade.init()

        list = await readFirst(facade.allStationData$)
        isLoaded = await readFirst(facade.loaded$)

        expect(list.length).toBe(0)
        expect(isLoaded).toBe(true)

        done()
      } catch (err) {
        done.fail(err)
      }
    })

    /**
     * Use `loadStationDataSuccess` to manually update list
     */
    it('allStationData$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allStationData$)
        let isLoaded = await readFirst(facade.loaded$)

        expect(list.length).toBe(0)
        expect(isLoaded).toBe(false)

        store.dispatch(
          StationDataActions.loadStationDataSuccess({
            stationData: [
              createStationDataEntity('AAA'),
              createStationDataEntity('BBB'),
            ],
          })
        )

        list = await readFirst(facade.allStationData$)
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
