import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BASE_PATH } from '@hydro-flow/data-access/hyfaa'
import { FeatureStationsModule } from '@hydro-flow/feature/hydro'
import { FeatureMapModule } from '@hydro-flow/feature/map'
import { DateSelectorModule } from '@hydro-flow/feature/time'
import { UiMapModule } from '@hydro-flow/ui/map'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'
import { SaguiEffects } from './+state/sagui.effects'
import { SaguiFacade } from './+state/sagui.facade'
import * as fromSagui from './+state/sagui.reducer'
import { SAGUI_FEATURE_KEY } from './+state/sagui.reducer'

import { AppComponent } from './app.component'
import { ChartContainerComponent } from './components/chart-container/chart-container.component'
import { HeaderComponent } from './components/header/header.component'
import { LegendContainerComponent } from './components/legend-container/legend-container.component'
import { MapContainerComponent } from './components/map-container/map-container.component'
import { SegmentLegendComponent } from './components/segment-legend/segment-legend.component'
import { SerieSelectorComponent } from './components/serie-selector/serie-selector.component'
import { RiverSegmentOverlayComponent } from './layers/river-segment-overlay/river-segment-overlay.component'
import { TabsContainerComponent } from './components/tabs-container/tabs-container.component'
import { TabPanelComponent } from './ui/tab-panel/tab-panel.component'

export const API_URL = '/api/v1'

@NgModule({
  declarations: [
    AppComponent,
    MapContainerComponent,
    RiverSegmentOverlayComponent,
    LegendContainerComponent,
    ChartContainerComponent,
    SerieSelectorComponent,
    SegmentLegendComponent,
    HeaderComponent,
    TabsContainerComponent,
    TabPanelComponent,
  ],
  imports: [
    BrowserModule,
    UiMapModule,
    DateSelectorModule,
    HttpClientModule,
    FeatureStationsModule,
    FeatureMapModule,
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
    StoreModule.forFeature(SAGUI_FEATURE_KEY, fromSagui.reducer),
    EffectsModule.forFeature([SaguiEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    SaguiFacade,
    {
      provide: BASE_PATH,
      useFactory: () => API_URL,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
