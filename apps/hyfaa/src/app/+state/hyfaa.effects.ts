import { Injectable } from '@angular/core'
import { HyfaaClient } from '@hydro-flow/data-access/hyfaa'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { fetch } from '@nrwl/angular'
import { map, switchMap } from 'rxjs/operators'
import * as HyfaaActions from './hyfaa.actions'

@Injectable()
export class HyfaaEffects {
  constructor(private actions$: Actions, private client: HyfaaClient) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HyfaaActions.setStationId),
      switchMap(({ stationId }) => this.client.getStationData(stationId)),
      map((stationData) => HyfaaActions.setStationData({ stationData }))
    )
  )

  /*
      fetch({
        run: (action) => {
          return HyfaaActions.setStationData({ stationData: [] })
        },
        onError: (action, error) => {
          console.error('Error', error)
          return HyfaaActions.setStationData({ stationData: 'error' })
        },
      })
*/
}
