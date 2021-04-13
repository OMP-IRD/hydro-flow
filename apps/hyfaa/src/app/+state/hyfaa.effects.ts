import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { fetch } from '@nrwl/angular'

import * as HyfaaFeature from './hyfaa.reducer'
import * as HyfaaActions from './hyfaa.actions'

@Injectable()
export class HyfaaEffects {
  /*
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HyfaaActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return HyfaaActions.loadHyfaaSuccess({ hyfaa: [] })
        },

        onError: (action, error) => {
          console.error('Error', error)
          return HyfaaActions.loadHyfaaFailure({ error })
        },
      })
    )
  )
*/

  constructor(private actions$: Actions) {}
}
