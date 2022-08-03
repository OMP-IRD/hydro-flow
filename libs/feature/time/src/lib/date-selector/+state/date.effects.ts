import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'

@Injectable()
export class DateEffects {
  constructor(private actions$: Actions) {}
}
