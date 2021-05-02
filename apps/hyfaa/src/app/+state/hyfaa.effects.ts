import { Injectable } from '@angular/core'
import { loadStationData, selectStation } from '@hydro-flow/feature/hydro'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { combineLatest, of } from 'rxjs'
import { startWith, switchMap } from 'rxjs/operators'
import { setDataSerie } from './hyfaa.actions'
import { initialState } from './hyfaa.reducer'

@Injectable()
export class HyfaaEffects {
  constructor(private actions$: Actions) {}

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
            : null
        )
      })
    )
  )
}
