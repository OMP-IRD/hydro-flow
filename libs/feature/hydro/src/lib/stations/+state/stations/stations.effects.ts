import { Injectable } from '@angular/core'
import { StationsApiService } from '@hydro-flow/data-access/hyfaa'
import { readFeatureCollection } from '@hydro-flow/feature/map'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { fetch } from '@nrwl/angular'
import { map } from 'rxjs/operators'

import * as StationsFeature from './stations.reducer'
import * as StationsActions from './stations.actions'

@Injectable()
export class StationsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StationsActions.init),
      fetch({
        run: (action) => {
          return this.stationsApi.getStationsAsGeojson().pipe(
            map((collection) => readFeatureCollection(collection)),
            map((olFeatures) =>
              StationsActions.loadStationsSuccess({ stations: olFeatures })
            )
          )
        },

        onError: (action, error) => {
          console.error('Error', error)
          return StationsActions.loadStationsFailure({ error })
        },
      })
    )
  )

  constructor(
    private actions$: Actions,
    private stationsApi: StationsApiService
  ) {}
}
