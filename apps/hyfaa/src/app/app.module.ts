import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { UiMapModule } from '@hydro-flow/ui/map'
import { UiTimeModule } from '@hydro-flow/ui/time'

import { AppComponent } from './app.component'
import { MapContainerComponent } from './components/map-container/map-container.component'
import { RiverSegmentOverlayComponent } from './layers/river-segment-overlay/river-segment-overlay.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'
import * as fromHyfaa from './+state/hyfaa.reducer'
import { HyfaaEffects } from './+state/hyfaa.effects'
import { HyfaaFacade } from './+state/hyfaa.facade'
import { LegendContainerComponent } from './components/legend-container/legend-container.component'

@NgModule({
  declarations: [
    AppComponent,
    MapContainerComponent,
    RiverSegmentOverlayComponent,
    LegendContainerComponent,
  ],
  imports: [
    BrowserModule,
    UiMapModule,
    UiTimeModule,
    HttpClientModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(fromHyfaa.HYFAA_FEATURE_KEY, fromHyfaa.reducer),
    EffectsModule.forFeature([HyfaaEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [HyfaaFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
