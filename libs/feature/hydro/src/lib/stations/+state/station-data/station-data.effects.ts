import { Injectable } from '@angular/core'
import { StationsApiService } from '@hydro-flow/data-access/hyfaa'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { fetch } from '@nrwl/angular'
import { map } from 'rxjs/operators'
import * as StationDataActions from './station-data.actions'

@Injectable()
export class StationDataEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StationDataActions.loadStationData),
      fetch({
        run: ({ stationId, options }) => {
          return this.stationsApi
            .getStationData(options.dataSerie, stationId)
            .pipe(
              map((data) =>
                StationDataActions.loadStationDataSuccess({ stationData: data })
              )
            )
        },

        onError: (action, error) => {
          console.error('Error', error)
          return StationDataActions.loadStationDataFailure({ error })
        },
      })
    )
  )

  constructor(
    private actions$: Actions,
    private stationsApi: StationsApiService
  ) {}
}
