import { Injectable } from '@angular/core'
import { reset, selectStation } from '@hydro-flow/feature/hydro'
import { readFeatureCollection } from '@hydro-flow/feature/map'
import { DateFacade } from '@hydro-flow/feature/time'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { FeatureCollection } from 'geojson'
import { combineLatest, Observable, of } from 'rxjs'
import {
  catchError,
  map,
  startWith,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators'
import { CellsApi } from '../../api/cells.api'
import * as CellsActions from './cells.actions'
import { initialState } from './cells.reducer'

@Injectable()
export class CellsEffects {
  init$ = createEffect(() =>
    combineLatest([
      this.actions$.pipe(ofType(CellsActions.load)),
      this.actions$.pipe(
        ofType(CellsActions.setFrequence),
        startWith({
          frequence: initialState.frequence,
        })
      ),
    ]).pipe(
      withLatestFrom(this.dateFacade.currentDate$),
      switchMap(([actions, date]) => {
        const loadAction = actions[0]
        const setFrequenceAction = actions[1]
        const { id } = loadAction
        const { frequence } = setFrequenceAction
        if (id) {
          let api$: Observable<FeatureCollection>
          if (frequence === 'min') {
            api$ = this.cellsApi.getRainAtTimeAndCell({
              cell_ident: loadAction.id,
              ref_time: date.toISOString(),
            })
          } else if (frequence === 'day') {
            api$ = this.cellsApi.getRainDailyAtTimeAndCell({
              cell_ident: loadAction.id,
              ref_time: date.toISOString(),
              duration: '1 year',
            })
          }
          return api$.pipe(
            map((collection) => readFeatureCollection(collection)),
            map((olFeatures) => olFeatures[0]),
            map((feature) => CellsActions.loadCellsSuccess({ feature }))
          )
        } else {
          return of(reset)
        }
      }),
      catchError((error) => {
        console.error('Error', error)
        return of(CellsActions.loadCellsFailure({ error }))
      })
    )
  )

  constructor(
    private actions$: Actions,
    private cellsApi: CellsApi,
    private dateFacade: DateFacade
  ) {}
}
