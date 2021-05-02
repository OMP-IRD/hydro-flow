import { Injectable } from '@angular/core'
import { HyfaaClient, StationsApiService } from '@hydro-flow/data-access/hyfaa'
import { ChartMapper, selectStation } from '@hydro-flow/feature/hydro'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { fetch } from '@nrwl/angular'
import { combineLatest, of } from 'rxjs'
import { map, switchMap, withLatestFrom } from 'rxjs/operators'
import { setDataSerie } from './hyfaa.actions'

@Injectable()
export class HyfaaEffects {
  constructor(
    private actions$: Actions,
    private stationsApi: StationsApiService
  ) {}

  loadDataSerie$ = createEffect(() =>
    combineLatest([
      this.actions$.pipe(ofType(selectStation)),
      this.actions$.pipe(ofType(setDataSerie)),
    ]).pipe(
      switchMap(([station, serie]) => {
        const { selectedId } = station
        const { dataSerie } = serie
        return selectedId
          ? this.stationsApi.getStationData(dataSerie, selectedId)
          : of(null)
      }),
      map((stationData) => HyfaaActions.setStationData({ stationData }))
    )
  )
}
