import { Injectable } from '@angular/core'
import { StationsApiService } from '@hydro-flow/data-access/hyfaa'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import * as StationDataActions from './station-data.actions'

@Injectable()
export class StationDataEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StationDataActions.loadStationData),
      switchMap(({ stationId, options }) =>
        this.stationsApi.getStationData(options.dataSerie, stationId)
      ),
      map((data) =>
        StationDataActions.loadStationDataSuccess({
          stationData: data,
        })
      ),
      catchError((error) =>
        of(StationDataActions.loadStationDataFailure({ error }))
      )
    )
  )

  constructor(
    private actions$: Actions,
    private stationsApi: StationsApiService
  ) {}
}
