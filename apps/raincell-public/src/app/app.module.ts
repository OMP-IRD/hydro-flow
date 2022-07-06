import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BASE_PATH } from '@hydro-flow/data-access/raincell'
import { FeatureCellsModule } from '@hydro-flow/feature/hydro'
import { FeatureMapModule } from '@hydro-flow/feature/map'
import { DateSelectorModule } from '@hydro-flow/feature/time'
import { UiMapModule } from '@hydro-flow/ui/map'
import {
  DATEPICKER_CONFIG,
  DATEPICKER_FORMAT_OPTIONS,
  UiTimeModule,
} from '@hydro-flow/ui/time'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'
import { RaincellEffects } from './+state/raincell.effects'
import { RAINCELL_FEATURE_KEY, reducer } from './+state/raincell.reducer'

import { AppComponent } from './app.component'
import { CellLegendComponent } from './components/cell-legend/cell-legend.component'
import { DatePickerContainerComponent } from './components/date-picker-container/date-picker-container.component'
import { HeaderComponent } from './components/header/header.component'
import { MapContainerComponent } from './components/map-container/map-container.component'
import { TimePlayerComponent } from './components/time-player/time-player.component'

export const API_URL = '/api/'

const TIMEPLAYER_FORMAT = {
  ...DATEPICKER_FORMAT_OPTIONS,
  hour: 'numeric',
  minute: 'numeric',
}
const MAT_DATEPICKER_FORMAT = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapContainerComponent,
    CellLegendComponent,
    DatePickerContainerComponent,
    TimePlayerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UiMapModule,
    HttpClientModule,
    FeatureMapModule,
    DateSelectorModule,
    UiTimeModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(RAINCELL_FEATURE_KEY, reducer),
    EffectsModule.forFeature([RaincellEffects]),
    FeatureCellsModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    {
      provide: BASE_PATH,
      useFactory: () => API_URL,
    },
    {
      provide: DATEPICKER_CONFIG,
      useValue: TIMEPLAYER_FORMAT,
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_DATEPICKER_FORMAT },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
