import { Injectable } from '@angular/core'
import { readFeatureCollection } from '@hydro-flow/feature/map'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { fetch } from '@nrwl/angular'
import { map } from 'rxjs/operators'
import { CellsApi } from '../../api/cells.api'

import * as CellsFeature from './cells.reducer'
import * as CellsActions from './cells.actions'

@Injectable()
export class CellsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CellsActions.selectCell),
      fetch({
        run: (action) => {
          return this.cellsApi
            .getRainAtTimeAndCell({
              cell_ident: action.selectedId,
            })
            .pipe(
              map((collection) => readFeatureCollection(collection)),
              map((olFeatures) =>
                CellsActions.loadCellsSuccess({ cells: olFeatures })
              )
            )
        },

        onError: (action, error) => {
          console.error('Error', error)
          return CellsActions.loadCellsFailure({ error })
        },
      })
    )
  )

  constructor(private actions$: Actions, private cellsApi: CellsApi) {}
}
