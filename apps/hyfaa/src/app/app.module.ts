import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BASE_PATH } from '@hydro-flow/data-access/hyfaa'
import { FeatureStationsModule } from '@hydro-flow/feature/hydro'
import { UiMapModule } from '@hydro-flow/ui/map'
import { UiTimeModule } from '@hydro-flow/ui/time'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'
import { HyfaaEffects } from './+state/hyfaa.effects'
import { HyfaaFacade } from './+state/hyfaa.facade'
import * as fromHyfaa from './+state/hyfaa.reducer'

import { AppComponent } from './app.component'
import { ChartContainerComponent } from './components/chart-container/chart-container.component'
import { LegendContainerComponent } from './components/legend-container/legend-container.component'
import { MapContainerComponent } from './components/map-container/map-container.component'
import { RiverSegmentOverlayComponent } from './layers/river-segment-overlay/river-segment-overlay.component'

export const API_URL = '/api/v1'

@NgModule({
  declarations: [
    AppComponent,
    MapContainerComponent,
    RiverSegmentOverlayComponent,
    LegendContainerComponent,
    ChartContainerComponent,
  ],
  imports: [
    BrowserModule,
    UiMapModule,
    UiTimeModule,
    HttpClientModule,
    FeatureStationsModule,
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
    StoreModule.forFeature(fromHyfaa.HYFAA_FEATURE_KEY, fromHyfaa.reducer),
    EffectsModule.forFeature([HyfaaEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    HyfaaFacade,
    {
      provide: BASE_PATH,
      useFactory: () => API_URL,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
