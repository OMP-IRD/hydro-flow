import { Injectable } from '@angular/core'
import { readFeatureCollection } from '@hydro-flow/feature/map'
import { DateFacade } from '@hydro-flow/feature/time'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators'
import { CellsApi } from '../../api/cells.api'
import * as CellsActions from './cells.actions'

@Injectable()
export class CellsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CellsActions.load),
      withLatestFrom(this.dateFacade.currentDate$),
      switchMap(([action, date]) => {
        return this.cellsApi
          .getRainAtTimeAndCell({
            cell_ident: action.id,
            ref_time: date.toISOString(),
          })
          .pipe(
            map((collection) => readFeatureCollection(collection)),
            map((olFeatures) => olFeatures[0]),
            map((feature) => CellsActions.loadCellsSuccess({ feature }))
          )
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
