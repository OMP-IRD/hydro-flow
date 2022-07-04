import { Injectable } from '@angular/core'
import {
  loadStationData,
  resetStationData,
  selectStation,
} from '@hydro-flow/feature/hydro'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { combineLatest, of } from 'rxjs'
import { startWith, switchMap } from 'rxjs/operators'
import { setActive } from './raincell.actions'
import { initialState } from './raincell.reducer'

@Injectable()
export class RaincellEffects {
  constructor(private actions$: Actions) {}
}
