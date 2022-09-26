import { Injectable } from '@angular/core'
import {
  loadStationData,
  loadStationsFailure,
  loadStationsSuccess,
  resetStationData,
  selectStation,
} from '@hydro-flow/feature/hydro'
import { readFeatureCollection } from '@hydro-flow/feature/map'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { fetch } from '@nrwl/angular'
import { FeatureCollection } from 'geojson'
import { combineLatest, of } from 'rxjs'
import { map, pluck, startWith, switchMap } from 'rxjs/operators'
import { ApiService } from '../api/api.service'
import { setDataSerie, setTab } from './sagui.actions'
import { SaguiFacade } from './sagui.facade'
import { initialState } from './sagui.reducer'

@Injectable({
  providedIn: 'root',
})
export class SaguiEffects {
  constructor(
    private actions$: Actions,
    private api: ApiService,
    private facade: SaguiFacade
  ) {}

  loadDataSerie$ = createEffect(() =>
    combineLatest([
      this.actions$.pipe(ofType(selectStation)),
      this.actions$.pipe(
        ofType(setDataSerie),
        startWith({
          dataSerie: initialState.dataSerie,
        })
      ),
    ]).pipe(
      switchMap(([selectStation, setDataSerie]) => {
        const { selectedId } = selectStation
        const { dataSerie } = setDataSerie
        return of(
          selectedId
            ? loadStationData({
                stationId: selectedId,
                options: { dataSerie },
              })
            : resetStationData()
        )
      })
    )
  )

  loadStations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setTab),
      fetch({
        run: (action) => {
          return action.tab === 'rain_alerts'
            ? loadStationsSuccess({ stations: [] })
            : this.api.stations(action.tab).pipe(
                pluck('results'),
                map((collection: FeatureCollection) =>
                  readFeatureCollection(collection)
                ),
                map((olFeatures) =>
                  loadStationsSuccess({ stations: olFeatures })
                )
              )
        },

        onError: (action, error) => {
          console.error('Error', error)
          return loadStationsFailure({ error })
        },
      })
    )
  )
}
