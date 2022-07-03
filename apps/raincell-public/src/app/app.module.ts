import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BASE_PATH } from '@hydro-flow/data-access/raincell'
import { FeatureMapModule } from '@hydro-flow/feature/map'
import { DateSelectorModule } from '@hydro-flow/feature/time'
import { UiMapModule } from '@hydro-flow/ui/map'
import { UiTimeModule } from '@hydro-flow/ui/time'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../../../hyfaa/src/environments/environment'

import { AppComponent } from './app.component'
import { CellLegendComponent } from './components/cell-legend/cell-legend.component'
import { DatePickerContainerComponent } from './components/date-picker-container/date-picker-container.component'
import { HeaderComponent } from './components/header/header.component'
import { MapContainerComponent } from './components/map-container/map-container.component'

export const API_URL = '/api/'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapContainerComponent,
    CellLegendComponent,
    DatePickerContainerComponent,
  ],
  imports: [
    BrowserModule,
    UiMapModule,
    HttpClientModule,
    FeatureMapModule,
    DateSelectorModule,
    UiTimeModule,
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
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    {
      provide: BASE_PATH,
      useFactory: () => API_URL,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
