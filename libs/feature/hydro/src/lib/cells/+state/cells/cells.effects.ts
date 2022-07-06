import { Injectable } from '@angular/core'
import { CellsFacade } from '@hydro-flow/feature/hydro'
import { readFeatureCollection } from '@hydro-flow/feature/map'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators'
import { CellsApi } from '../../api/cells.api'
import * as CellsActions from './cells.actions'

@Injectable()
export class CellsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CellsActions.selectCell),
      withLatestFrom(this.facade.date$),
      switchMap(([action, date]) => {
        return this.cellsApi
          .getRainAtTimeAndCell({
            cell_ident: action.selectedId,
            ref_time: date.toISOString(),
          })
          .pipe(
            map((collection) => readFeatureCollection(collection)),
            map((olFeatures) =>
              CellsActions.loadCellsSuccess({ cells: olFeatures })
            )
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
    private facade: CellsFacade
  ) {}
}
